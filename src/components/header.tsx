import { useEffect, useRef, useState } from 'react'
import { contactSection, profile, sections } from '@/content/site'
import { scrollToId } from '@/lib/utils'
import ThemeToggle from './theme-toggle'

const Header = () => {
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const bar = progressRef.current
      if (!bar) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      // Direct style write on a ref, coalesced to one frame. Never setState here.
      bar.style.transform = `scaleX(${ratio})`
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    // Requires every section to be in the DOM at mount — this is why App.tsx
    // renders the sections eagerly instead of behind lazy()/<Suspense>.
    const ids = [...sections.map((section) => section.id), contactSection.id]
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[var(--header-bg)] backdrop-blur-[9px]">
      <div className="mx-auto flex h-14 max-w-shell items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-[17px] leading-none text-ink transition-opacity hover:opacity-70 sm:text-[19px]"
        >
          {profile.name}
          <span className="text-accent">.</span>
        </button>

        <nav aria-label="Sections" className="hidden sm:block">
          <ul className="flex items-center gap-7">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(section.id)}
                  aria-current={active === section.id ? 'true' : undefined}
                  className="group flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.1em]"
                >
                  <span className={active === section.id ? 'text-accent' : 'text-fade'}>
                    {section.num}
                  </span>
                  <span
                    className={`transition-colors ${
                      active === section.id ? 'text-ink' : 'text-mut group-hover:text-ink'
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-ink px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper transition-opacity hover:opacity-85 sm:px-4"
          >
            Email me
          </a>
        </div>
      </div>

      {/* Mobile keeps the nav on a second row rather than dropping it. */}
      <nav aria-label="Sections" className="border-t border-line sm:hidden">
        <ul className="mx-auto flex h-9 max-w-shell items-center gap-6 px-5">
          {[...sections, contactSection].map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToId(section.id)}
                aria-current={active === section.id ? 'true' : undefined}
                className={`font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors ${
                  active === section.id ? 'text-accent' : 'text-fade'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent"
      />
    </header>
  )
}

export default Header
