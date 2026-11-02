import { HAS_RESUME, links, profile } from '@/content/site'

const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
      <div
        className="mx-auto max-w-shell border-t border-line pt-16"
      >
        <h2 data-design="Section label" id="contact-title" className="section-label">04 — Contact</h2>

        <h3 data-design="Heading" className="mt-8 max-w-[14ch] font-serif text-[clamp(2.1rem,6.5vw,2.875rem)] leading-[1.06] text-ink">
          Let&rsquo;s build <em className="italic text-accent">something</em>.
        </h3>

        <a
          href={`mailto:${profile.email}`}
          data-design="Email"
          className="mt-10 inline-block border-b border-[var(--pill-line)] pb-1 font-serif text-[clamp(1.25rem,4vw,1.6875rem)] leading-none text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {profile.email}
        </a>

        <div data-design="Socials" className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          {([
            { label: 'GitHub', href: links.github },
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'X', href: links.x },
            ...(HAS_RESUME ? [{ label: 'Résumé', href: links.resume, download: true }] : []),
          ] as { label: string; href: string; download?: boolean }[]).map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download
                ? { download: true }
                : { target: '_blank', rel: 'noopener noreferrer' })}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-fade transition-colors hover:text-accent"
            >
              {link.label} {link.download ? '↓' : '↗'}
            </a>
          ))}
        </div>

        <p data-design="Meta" className="mt-14 font-mono text-[10.5px] uppercase tracking-[0.11em] text-fade">
          {profile.availability} · {profile.location} · {profile.timezone}
        </p>
      </div>
    </section>
  )
}

export default Contact
