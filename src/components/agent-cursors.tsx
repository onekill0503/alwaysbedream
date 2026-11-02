import { useEffect, useLayoutEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

/*
 * A canvas of design agents. Every element marked `data-design="Label"` starts
 * clipped away. When it scrolls into view the nearest idle agent flies to its
 * top-left corner and drags out the block area, then finishes the content:
 * single-line text is typed in, anything else is dropped in off-position and
 * dragged into place (`data-design-fx` overrides: type | shift | none). Once
 * the contact section is in view and nothing is waiting, idle agents orbit on
 * its empty right side.
 *
 * One rAF loop drives every agent with a spring, so flights curve, overshoot
 * and settle, and idle agents keep drifting. Imperative on purpose: this is a
 * per-frame animation, not React state. Positions are document coordinates.
 */

const AGENTS = [
  { name: 'Layout', color: '#6d5efc' },
  { name: 'Type', color: '#0ea371' },
  { name: 'Color', color: '#e8590c' },
  { name: 'Motion', color: '#2f7cf6' },
]

// An element left waiting this long is revealed without an agent, so a fast
// scroll never leaves content hidden behind a long queue.
const FALLBACK_MS = 5000
const HOLD_MS = 150
// Any phase that has not settled by now is forced on; a stuck agent would
// otherwise leave its element clipped.
const PHASE_LIMIT_MS = 2600

type Phase = 'idle' | 'travel' | 'draw' | 'type' | 'grab' | 'drag' | 'hold'
type Fx = 'type' | 'shift' | 'none'
type Rect = { x: number; y: number; w: number; h: number }

// [stiffness, damping] per phase. Under-damped where a little overshoot reads
// as a hand moving (travel, drag); stiff where the cursor tracks a caret.
const SPRING: Record<Phase | 'orbit', [number, number]> = {
  idle: [14, 6.5],
  orbit: [45, 11],
  travel: [130, 17],
  draw: [100, 18],
  type: [320, 34],
  grab: [150, 21],
  drag: [110, 12.5],
  hold: [40, 12],
}

type Agent = {
  el: HTMLDivElement
  svg: SVGSVGElement
  frame: HTMLDivElement
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  phase: Phase
  since: number
  home: { x: number; y: number }
  nextHome: number
  seed: number
  job?: HTMLElement
  r?: Rect
  text?: { width: number; chars: number; dur: number }
  grab?: { x: number; y: number; rot: number; dist: number }
}

const enabled = () => !prefersReducedMotion()
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

function docRect(el: Element): Rect {
  const r = el.getBoundingClientRect()
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }
}

/** Width of the text if it sits on a single line, else null. */
function singleLineText(el: HTMLElement) {
  const chars = (el.textContent ?? '').trim().length
  if (!chars) return null
  const range = document.createRange()
  range.selectNodeContents(el)
  const rects = [...range.getClientRects()].filter((r) => r.width > 0)
  if (!rects.length) return null
  const top = Math.min(...rects.map((r) => r.top))
  const bottom = Math.max(...rects.map((r) => r.bottom))
  const lineH = Math.min(...rects.map((r) => r.height))
  if (bottom - top > lineH * 1.6) return null
  const right = Math.max(...rects.map((r) => r.right))
  return { width: right - el.getBoundingClientRect().left, chars }
}

const AgentCursors = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  // Before paint, so marked content is never shown once and then clipped.
  useLayoutEffect(() => {
    if (!enabled()) return
    document.documentElement.classList.add('agents-on')
    return () => document.documentElement.classList.remove('agents-on')
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled()) return

    const frames = root.querySelectorAll<HTMLDivElement>('.agent-frame')
    const now0 = performance.now()
    const agents: Agent[] = [...root.querySelectorAll<HTMLDivElement>('.agent')].map((el, i) => {
      // Enter across the first screen, staggered in height.
      const x = window.innerWidth * (0.18 + 0.22 * i)
      const y = window.scrollY + window.innerHeight * (0.22 + 0.16 * (i % 2))
      return {
        el,
        svg: el.querySelector('svg')!,
        frame: frames[i],
        x,
        y,
        vx: 0,
        vy: 0,
        tx: x,
        ty: y,
        phase: 'idle',
        since: now0,
        home: { x, y },
        nextHome: now0 + 1500,
        seed: i * 1.9,
      }
    })

    const timers = new Set<number>()
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id)
        fn()
      }, ms)
      timers.add(id)
    }

    const queue: HTMLElement[] = []
    let orbit: { cx: number; cy: number; radius: number } | null = null

    const press = (a: Agent) => {
      a.el.classList.add('is-press')
      later(() => a.el.classList.remove('is-press'), 140)
    }

    const setPhase = (a: Agent, phase: Phase, now: number) => {
      a.phase = phase
      a.since = now
    }

    const reveal = (el: HTMLElement) => {
      el.dataset.designState = 'active'
      later(() => (el.dataset.designState = 'built'), 650)
    }

    const clearJobStyles = (el: HTMLElement) => {
      el.style.clipPath = ''
      el.style.translate = ''
      el.style.rotate = ''
    }

    const startJob = (a: Agent, el: HTMLElement, now: number) => {
      a.job = el
      el.dataset.designState = 'claimed'
      a.r = docRect(el)
      setPhase(a, 'travel', now)
      // A sideways kick bends the flight into an arc instead of a ruler line.
      const dx = a.r.x - a.x
      const dy = a.r.y - a.y
      const d = Math.hypot(dx, dy) || 1
      const kick = d * (1.2 + Math.random() * 1.3) * (Math.random() < 0.5 ? -1 : 1)
      a.vx += (-dy / d) * kick
      a.vy += (dx / d) * kick
    }

    const startDraw = (a: Agent, now: number) => {
      const el = a.job!
      a.r = docRect(el) // re-measure: fonts or images may have moved it
      const f = a.frame
      f.style.transform = `translate3d(${a.r.x}px, ${a.r.y}px, 0)`
      f.style.width = '0px'
      f.style.height = '0px'
      f.firstElementChild!.textContent = el.dataset.design ?? ''
      f.classList.add('is-on')
      press(a)
      setPhase(a, 'draw', now)
    }

    const endDraw = (a: Agent, now: number) => {
      const el = a.job!
      const r = a.r!
      a.frame.style.width = `${r.w}px`
      a.frame.style.height = `${r.h}px`
      let fx = (el.dataset.designFx as Fx | undefined) ?? 'type'
      const text = fx === 'type' ? singleLineText(el) : null
      if (fx === 'type' && !text) fx = 'shift'

      if (fx === 'type' && text) {
        a.text = { ...text, dur: clamp(text.chars * 38, 320, 950) }
        el.style.clipPath = `inset(0 ${r.w}px 0 0)`
        a.frame.classList.add('is-typing')
        setPhase(a, 'type', now)
      } else if (fx === 'shift') {
        // Dropped in off-position; the agent grabs it and drags it home.
        const ox = (Math.random() < 0.5 ? -1 : 1) * (28 + Math.random() * 44)
        const oy = (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * 20)
        const rot = (Math.random() - 0.5) * 7
        el.style.clipPath = 'none'
        el.style.translate = `${ox}px ${oy}px`
        el.style.rotate = `${rot}deg`
        a.grab = {
          x: r.x + Math.min(r.w * 0.4, 160),
          y: r.y + Math.min(r.h * 0.5, 40),
          rot,
          dist: Math.hypot(ox, oy),
        }
        a.tx = a.grab.x + ox
        a.ty = a.grab.y + oy
        setPhase(a, 'grab', now)
      } else {
        el.style.clipPath = 'none'
        setPhase(a, 'hold', now)
      }
    }

    const finishJob = (a: Agent, now: number) => {
      const el = a.job!
      el.dataset.designState = 'built'
      clearJobStyles(el)
      a.frame.classList.remove('is-on', 'is-typing')
      a.job = undefined
      a.home = { x: a.x, y: a.y }
      a.nextHome = now + 600 + Math.random() * 1200
      setPhase(a, 'idle', now)
    }

    const pickHome = (a: Agent, now: number) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const sy = window.scrollY
      const inView = a.home.y > sy + 90 && a.home.y < sy + vh - 40
      a.home = inView
        ? {
            x: clamp(a.home.x + (Math.random() - 0.5) * 180, vw * 0.08, vw * 0.92),
            y: clamp(a.home.y + (Math.random() - 0.5) * 140, sy + vh * 0.18, sy + vh * 0.88),
          }
        : // Scrolled away: come back into view, toward the emptier right side.
          { x: vw * (0.55 + Math.random() * 0.37), y: sy + vh * (0.25 + Math.random() * 0.6) }
      a.nextHome = now + 2500 + Math.random() * 3500
    }

    const next = () => {
      const now = performance.now()
      while (queue.length) {
        const free = agents.filter((a) => a.phase === 'idle')
        if (!free.length) break
        const el = queue.shift()!
        const r = docRect(el)
        const nearest = free.reduce((best, a) =>
          Math.hypot(a.x - r.x, a.y - r.y) < Math.hypot(best.x - r.x, best.y - r.y) ? a : best,
        )
        startJob(nearest, el, now)
      }
    }

    const arrived = (a: Agent, now: number) =>
      (Math.hypot(a.tx - a.x, a.ty - a.y) < 4 && Math.hypot(a.vx, a.vy) < 120) ||
      now - a.since > PHASE_LIMIT_MS

    const step = (a: Agent, index: number, now: number, dt: number) => {
      const r = a.r
      let spring: Phase | 'orbit' = a.phase

      switch (a.phase) {
        case 'idle': {
          if (orbit && !queue.length) {
            spring = 'orbit'
            const angle = now * 0.0009 + (index / agents.length) * Math.PI * 2
            a.tx = orbit.cx + Math.cos(angle) * orbit.radius
            a.ty = orbit.cy + Math.sin(angle) * orbit.radius
            break
          }
          const sy = window.scrollY
          const offscreen = a.home.y < sy + 60 || a.home.y > sy + window.innerHeight
          if (now > a.nextHome || offscreen) pickHome(a, now)
          a.tx = a.home.x + Math.sin(now * 0.0011 + a.seed) * 16
          a.ty = a.home.y + Math.sin(now * 0.0014 + a.seed * 2) * 10
          break
        }
        case 'travel':
          a.tx = r!.x
          a.ty = r!.y
          if (arrived(a, now)) startDraw(a, now)
          break
        case 'draw':
          a.tx = r!.x + r!.w
          a.ty = r!.y + r!.h
          a.frame.style.width = `${clamp(a.x - r!.x, 0, r!.w)}px`
          a.frame.style.height = `${clamp(a.y - r!.y, 0, r!.h)}px`
          if (arrived(a, now)) endDraw(a, now)
          break
        case 'type': {
          const t = a.text!
          const p = Math.min(1, (now - a.since) / t.dur)
          const shown = (Math.floor(p * t.chars) / t.chars) * t.width
          a.job!.style.clipPath = p >= 1 ? 'none' : `inset(0 ${Math.max(0, r!.w - shown)}px 0 0)`
          ;(a.frame.children[1] as HTMLElement).style.left = `${shown}px`
          a.tx = r!.x + shown + 2
          a.ty = r!.y + r!.h - 2
          if (p >= 1) setPhase(a, 'hold', now)
          break
        }
        case 'grab':
          if (arrived(a, now)) {
            press(a)
            a.tx = a.grab!.x
            a.ty = a.grab!.y
            setPhase(a, 'drag', now)
          }
          break
        case 'drag': {
          const g = a.grab!
          const ox = a.x - g.x
          const oy = a.y - g.y
          a.job!.style.translate = `${ox}px ${oy}px`
          a.job!.style.rotate = `${g.rot * clamp(Math.hypot(ox, oy) / g.dist, 0, 1)}deg`
          if (arrived(a, now)) {
            a.job!.style.translate = ''
            a.job!.style.rotate = ''
            setPhase(a, 'hold', now)
          }
          break
        }
        case 'hold':
          if (now - a.since > HOLD_MS) {
            finishJob(a, now)
            next()
          }
          break
      }

      const [k, c] = SPRING[spring]
      a.vx += (k * (a.tx - a.x) - c * a.vx) * dt
      a.vy += (k * (a.ty - a.y) - c * a.vy) * dt
      const speed = Math.hypot(a.vx, a.vy)
      if (speed > 3200) {
        a.vx *= 3200 / speed
        a.vy *= 3200 / speed
      }
      a.x += a.vx * dt
      a.y += a.vy * dt

      a.el.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`
      // Lean into the direction of travel, like a hand moving a mouse.
      a.svg.style.transform = `rotate(${clamp(a.vx * 0.012, -16, 16)}deg)`
    }

    let loopRaf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      agents.forEach((a, i) => step(a, i, now, dt))
      loopRaf = requestAnimationFrame(loop)
    }

    // A scroll scan rather than IntersectionObserver: Chromium intersects a
    // target through its own clip-path, so a clipped element never "enters".
    const pending = new Set(
      document.querySelectorAll<HTMLElement>('[data-design]:not([data-design-state])'),
    )
    const contact = document.getElementById('contact')
    let scanRaf = 0
    const scan = () => {
      scanRaf = 0
      const vh = window.innerHeight
      for (const el of pending) {
        if (el.dataset.designState) {
          pending.delete(el)
          continue
        }
        const r = el.getBoundingClientRect()
        // Short items count once their own height is in: the fixed header sits
        // in the top strip and the footer in the bottom one.
        const inView = r.width > 0 && r.top < vh - Math.min(vh * 0.1, r.height) && r.bottom > 0
        const queued = queue.indexOf(el)
        if (inView && queued < 0) {
          queue.push(el)
          later(() => {
            const i = queue.indexOf(el)
            if (i < 0) return
            queue.splice(i, 1)
            reveal(el)
          }, FALLBACK_MS)
        } else if (!inView && queued >= 0) {
          // Scrolled past before an agent got to it: wait for the next visit.
          queue.splice(queued, 1)
        }
      }
      orbit = null
      if (contact) {
        const r = contact.getBoundingClientRect()
        if (r.top < vh * 0.6 && r.bottom > vh * 0.4) {
          const d = docRect(contact)
          orbit = {
            cx: d.x + d.w * 0.74,
            cy: d.y + d.h * 0.5,
            radius: Math.min(110, Math.max(56, d.w * 0.08)),
          }
        }
      }
      next()
    }
    const onScroll = () => {
      if (!scanRaf) scanRaf = requestAnimationFrame(scan)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    agents.forEach((a) => (a.el.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`))
    root.classList.add('is-ready')
    loopRaf = requestAnimationFrame(loop)
    onScroll()

    return () => {
      cancelAnimationFrame(loopRaf)
      cancelAnimationFrame(scanRaf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      timers.forEach(clearTimeout)
      root.classList.remove('is-ready')
      // Anything mid-flight is shown rather than left half-clipped.
      agents.forEach((a) => {
        if (!a.job) return
        a.job.dataset.designState = 'built'
        clearJobStyles(a.job)
      })
    }
  }, [])

  return (
    <div ref={rootRef} className="agents" aria-hidden="true">
      {AGENTS.map((agent) => (
        <div key={`frame-${agent.name}`} className="agent-frame" style={{ '--c': agent.color } as CSSProperties}>
          <span className="agent-frame-tag" />
          <b className="agent-caret" />
          <i /><i /><i /><i />
        </div>
      ))}
      {AGENTS.map((agent) => (
        <div key={agent.name} className="agent" style={{ '--c': agent.color } as CSSProperties}>
          <div className="agent-body">
            <svg width="16" height="18" viewBox="0 0 16 18">
              <path d="M1 1l13 7.2-5.8 1.5L5.4 16z" fill="var(--c)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <span className="agent-tag">{agent.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AgentCursors
