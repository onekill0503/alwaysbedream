import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { alsoBuilt, work } from '@/content/site'
import { prefersReducedMotion } from '@/lib/utils'

const Work = () => {
  const reduced = prefersReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(work[0].slug)

  useEffect(() => {
    const nodes = listRef.current?.querySelectorAll<HTMLElement>('[data-slug]')
    if (!nodes || nodes.length === 0) return

    // A thin band across the middle of the viewport, so exactly one project
    // is ever the active one. State changes once per project, not per scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.getAttribute('data-slug')
          if (entry.isIntersecting && slug) setActive(slug)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" aria-labelledby="work-title" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-shell">
        <h2 id="work-title" className="section-label">01 — Selected work</h2>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[220px_1fr] lg:gap-20">
          <nav aria-label="Project index" className="hidden self-start lg:sticky lg:top-28 lg:block">
            <ol className="grid gap-3">
              {work.map((project, index) => (
                <li key={project.slug}>
                  <a
                    href={`#work-${project.slug}`}
                    className={`grid grid-cols-[28px_1fr] gap-3 border-l-2 py-1 pl-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                      active === project.slug
                        ? 'border-accent text-ink'
                        : 'border-transparent text-fade hover:text-mut'
                    }`}
                  >
                    <span className={active === project.slug ? 'text-accent' : ''}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{project.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <ol ref={listRef} className="grid gap-24 lg:gap-32">
            {work.map((project, index) => (
              <motion.li
                key={project.slug}
                id={`work-${project.slug}`}
                data-slug={project.slug}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="scroll-mt-28"
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-fade">
                  {String(index + 1).padStart(2, '0')}
                </p>

                <h3 className="mt-3 font-serif text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.08] text-ink">
                  {project.title}
                </h3>

                <p className="mt-4 inline-block rounded-full border border-[var(--pill-line)] bg-[var(--pill-fill)] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.09em] text-accent">
                  {project.achievement}
                </p>

                <p className="body-copy mt-6 max-w-[60ch] text-[15px] leading-[1.75] text-mut">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tech.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-fade"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {project.links.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-5">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-line pb-0.5 font-mono text-[11px] uppercase tracking-[0.09em] text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-28 border-t border-line pt-12">
          <h3 className="section-label">Also built</h3>
          <ul className="mt-7 grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2">
            {alsoBuilt.map((repo) => (
              <li key={repo.href} className="border-b border-line">
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-4 transition-colors"
                >
                  <span className="font-sans text-[15px] font-medium text-ink transition-colors group-hover:text-accent">
                    {repo.name}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-fade">
                    ↗
                  </span>
                  <span className="col-span-2 font-mono text-[10.5px] tracking-[0.03em] text-fade">
                    {repo.descriptor}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Work
