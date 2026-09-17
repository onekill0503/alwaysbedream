import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { HAS_RESUME, links, profile } from '@/content/site'
import { EASE_OUT, prefersReducedMotion, scrollToId } from '@/lib/utils'
import HeroStack from './hero-stack'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

// Full transform strings, not the `y` shorthand: those run on the main thread,
// and the hero animates while fonts and scripts are still loading.
const rise: Variants = {
  hidden: { opacity: 0, transform: 'translateY(18px)' },
  visible: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.5, ease: EASE_OUT } },
}

// Reduced motion keeps the fade and drops the movement.
const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
}

const Hero = () => {
  const reduced = prefersReducedMotion()
  const item = reduced ? fade : rise

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16"
    >
      <m.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
      >
        <div>
          <m.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fade"
          >
            {profile.kicker}
          </m.p>

          <m.h1
            id="hero-title"
            variants={item}
            className="mt-5 font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.01em] text-ink"
          >
            {profile.name}
            <span className="text-accent">.</span>
          </m.h1>

          <m.div
            variants={item}
            aria-hidden="true"
            className="mt-6 h-[3px] w-16 rounded-full bg-accent"
          />

          <m.p
            variants={item}
            className="body-copy mt-6 max-w-[38ch] font-sans text-[clamp(1.05rem,2vw,1.35rem)] leading-relaxed text-mut"
          >
            {profile.tagline}
          </m.p>

          <m.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={() => scrollToId('work')}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-[color,transform] hover:text-accent active:scale-[0.97]"
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
                download
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-mut transition-colors hover:text-accent"
              >
                Résumé ↓
              </a>
            )}
          </m.div>
        </div>

        <div className="min-w-0">
          <HeroStack />
        </div>
      </m.div>
    </section>
  )
}

export default Hero
