import { motion } from 'framer-motion'
import { about, profile, stack } from '@/content/site'
import { prefersReducedMotion } from '@/lib/utils'

const About = () => {
  const reduced = prefersReducedMotion()

  return (
    <section id="about" className="px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-shell">
        <p className="section-label">03 — About</p>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px] lg:gap-24">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="max-w-[19ch] font-serif text-[clamp(1.75rem,4.5vw,2.25rem)] leading-[1.14] text-ink">
              {about.lead.before}
              <em className="italic text-accent">{about.lead.accent}</em>
              {about.lead.after}
            </p>

            {about.paragraphs.map((segments) => (
              <p
                key={segments[0].text}
                className="body-copy mt-7 max-w-[58ch] text-[16px] leading-[1.8] text-mut"
              >
                {segments.map((segment, index) =>
                  segment.strong ? (
                    <strong key={index} className="font-medium text-ink">
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  ),
                )}
              </p>
            ))}

            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-line pt-8 sm:grid-cols-3">
              {[
                { term: 'Based in', value: profile.location },
                { term: 'Timezone', value: profile.timezone },
                { term: 'Status', value: profile.availability },
              ].map((fact) => (
                <div key={fact.term}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fade">
                    {fact.term}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[14px] text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="self-start">
            <p className="section-label">Stack</p>
            <dl className="mt-6">
              {stack.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[84px_1fr] items-baseline gap-5 border-b border-line py-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-fade">
                    {row.label}
                  </dt>
                  <dd className="font-mono text-[11.5px] leading-[1.9] tracking-[0.02em] text-ink">
                    {row.items.join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
