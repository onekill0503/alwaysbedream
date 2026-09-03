import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/utils'
import './hero-stack.css'

const LAYERS = [
  { name: 'Interface', tech: 'React · Next.js' },
  { name: 'Services', tech: 'Node · Hono · Solidity' },
  { name: 'Data', tech: 'PostgreSQL · Mongo' },
  { name: 'Infrastructure', tech: 'Docker · Linux · CI/CD' },
]

const FONT_TIMEOUT_MS = 800
const OPENING_BEAT_MS = 250

function whenFontsSettled(): Promise<void> {
  const ready =
    'fonts' in document ? document.fonts.ready.then(() => undefined) : Promise.resolve()
  // fonts.ready can hang on a poor connection. An animation that never fires
  // is worse than one that fires with fallback type.
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS))
  return Promise.race([ready, timeout])
}

function whenTabVisible(): Promise<void> {
  if (document.visibilityState === 'visible') return Promise.resolve()
  return new Promise((resolve) => {
    const onChange = () => {
      if (document.visibilityState !== 'visible') return
      document.removeEventListener('visibilitychange', onChange)
      resolve()
    }
    document.addEventListener('visibilitychange', onChange)
  })
}

function whenInViewport(element: HTMLElement | null): Promise<void> {
  if (!element || typeof IntersectionObserver === 'undefined') return Promise.resolve()
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        resolve()
      },
      { threshold: 0.15 },
    )
    observer.observe(element)
  })
}

const HeroStack = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)
  const [running, setRunning] = useState(false)

  // Decided during render, not in an effect: arming after paint would show
  // one frame of the settled stack before blanking it.
  const reduced = prefersReducedMotion()
  const armed = !reduced

  useEffect(() => {
    if (reduced || startedRef.current) return
    // Guards React StrictMode's development double-mount. Deliberately no
    // cleanup: cancelling here would kill the first mount's pending gate and
    // the second mount returns early, so the build would never run in dev.
    startedRef.current = true

    void Promise.all([
      whenFontsSettled(),
      whenTabVisible(),
      whenInViewport(containerRef.current),
      new Promise<void>((resolve) => setTimeout(resolve, OPENING_BEAT_MS)),
    ]).then(() => setRunning(true))
  }, [reduced])

  useEffect(() => {
    const container = containerRef.current
    const tilt = tiltRef.current
    if (reduced || !container || !tilt) return

    const clamp = (n: number) => Math.max(-0.5, Math.min(0.5, n))
    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      // Normalise against a fixed radius around the stack's centre, not the
      // container width. Since the section went full-bleed the container is
      // far wider than the object, so width-relative math kept the cursor
      // pinned near px=0 — no tilt — the whole time it was over the stack.
      const px = clamp((event.clientX - (rect.left + rect.width / 2)) / 300)
      const py = clamp((event.clientY - (rect.top + rect.height / 2)) / 260)
      // Direct style write, no setState: this fires on every pixel of movement.
      tilt.style.transform = `perspective(1000px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg)`
    }
    const onLeave = () => {
      tilt.style.transform = ''
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className={`hero-stack${armed ? ' is-armed' : ''}${running ? ' is-running' : ''}`}
    >
      <div className="hero-stack__float">
        <div ref={tiltRef} className="hero-stack__tilt">
          <div className="hero-stack__iso" aria-hidden="true">
            {LAYERS.map((layer, index) => (
              <div key={layer.name} className={`hero-stack__layer hero-stack__layer--${index}`} />
            ))}
            <div className="hero-stack__packet" />
          </div>

          {/* Inside the tilt wrapper so the labels ride the float and the
              mouse tilt with the stack as one object. */}
          <ul className="hero-stack__legend">
            {LAYERS.map((layer, index) => (
              <li
                key={layer.name}
                className={`hero-stack__legend-row hero-stack__legend-row--${index}`}
              >
                <span className="hero-stack__legend-name">{layer.name}</span>
                <span className="hero-stack__legend-tech">{layer.tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeroStack
