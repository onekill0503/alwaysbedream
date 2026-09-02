import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { HAS_RESUME, links, profile } from '@/content/site'
import { prefersReducedMotion, scrollToId } from '@/lib/utils'
import HeroStack from './hero-stack'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const Hero = () => {
  const reduced = prefersReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={container}
        initial={reduced ? false : 'hidden'}
        animate="visible"
        className="mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
      >
        <div>
          <motion.h1
            variants={item}
            className="font-serif text-[clamp(2.75rem,8vw,5.25rem)] font-normal leading-[1.02] tracking-tight text-ink"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="body-copy mt-6 max-w-[42ch] font-sans text-[clamp(1rem,2vw,1.3rem)] leading-relaxed text-mut"
          >
            {profile.role}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId('work')}
              className="rounded-md bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-paper transition-opacity hover:opacity-85"
            >
              See the work ↓
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Email me
            </a>

            {HAS_RESUME && (
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Résumé ↗
              </a>
            )}
          </motion.div>
        </div>

        <motion.div variants={item} className="min-w-0">
          <HeroStack />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
