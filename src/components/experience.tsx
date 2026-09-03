import { motion } from 'framer-motion'
import { experience, experienceCrossRef } from '@/content/site'
import { prefersReducedMotion } from '@/lib/utils'

const Experience = () => {
  const reduced = prefersReducedMotion()

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-shell">
        <h2 id="experience-title" className="section-label">02 — Experience</h2>

        <div className="mt-14 grid gap-16">
          {experience.map((group) => (
            <div key={group.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-4">
                <h3 className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] leading-tight text-ink">
                  {group.company}
                </h3>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-fade">
                  {group.span}
                </p>
              </div>

              <ol>
                {group.roles.map((role) => (
                  <motion.li
                    key={`${group.company}-${role.period}-${role.title}`}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="grid grid-cols-1 gap-1 border-b border-line py-6 sm:grid-cols-[128px_1fr] sm:gap-8"
                  >
                    <p
                      className={`font-mono text-[11px] uppercase tracking-[0.09em] ${
                        role.current ? 'text-accent' : 'text-fade'
                      }`}
                    >
                      {role.period}
                    </p>

                    <div>
                      <p className="font-sans text-[16px] font-medium text-ink">
                        {role.title}
                      </p>
                      <p className="mt-1 font-mono text-[10.5px] tracking-[0.04em] text-fade">
                        {role.location}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {role.tech.map((item) => (
                          <li
                            key={item}
                            className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-mut"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="body-copy mt-12 max-w-[62ch] text-[14px] leading-[1.8] text-mut">
          {experienceCrossRef.lead}{' '}
          <span className="text-ink">{experienceCrossRef.projects.join(', ')}</span> —{' '}
          <a
            href="#work"
            className="border-b border-line pb-0.5 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {experienceCrossRef.tail} ↑
          </a>
        </p>
      </div>
    </section>
  )
}

export default Experience
