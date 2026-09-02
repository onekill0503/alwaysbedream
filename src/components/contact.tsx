import { motion } from 'framer-motion'
import { HAS_RESUME, links, profile } from '@/content/site'
import { prefersReducedMotion } from '@/lib/utils'

const Contact = () => {
  const reduced = prefersReducedMotion()

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-28 sm:px-6 lg:px-8 lg:py-40">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto max-w-shell border-t border-line pt-16"
      >
        <h2 id="contact-title" className="section-label">04 — Contact</h2>

        <h3 className="mt-8 max-w-[14ch] font-serif text-[clamp(2.1rem,6.5vw,2.875rem)] leading-[1.06] text-ink">
          Let&rsquo;s build <em className="italic text-accent">something</em>.
        </h3>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block border-b border-[var(--pill-line)] pb-1 font-serif text-[clamp(1.25rem,4vw,1.6875rem)] leading-none text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {profile.email}
        </a>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { label: 'GitHub', href: links.github },
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'X', href: links.x },
            ...(HAS_RESUME ? [{ label: 'Résumé', href: links.resume }] : []),
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-fade transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        <p className="mt-14 font-mono text-[10.5px] uppercase tracking-[0.11em] text-fade">
          {profile.availability} · {profile.location} · {profile.timezone}
        </p>
      </motion.div>
    </section>
  )
}

export default Contact
