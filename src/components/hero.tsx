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
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16"
    >
      <motion.div
        variants={container}
        initial={reduced ? false : 'hidden'}
        animate="visible"
        className="mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
      >
        <div>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fade"
          >
            {profile.kicker}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-5 font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.01em] text-ink"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.div
            variants={item}
            aria-hidden="true"
            className="mt-6 h-[3px] w-16 rounded-full bg-accent"
          />

          <motion.p
            variants={item}
            className="body-copy mt-6 max-w-[38ch] font-sans text-[clamp(1.05rem,2vw,1.35rem)] leading-relaxed text-mut"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={() => scrollToId('work')}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:text-accent"
            >
              See the work
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-mut transition-colors hover:text-accent"
            >
              Email ↗
            </a>

            {HAS_RESUME && (
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-mut transition-colors hover:text-accent"
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
