import { links, profile } from '@/content/site'

const social = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'X', href: links.x },
]

const Footer = () => (
  <footer className="border-t border-line px-5 py-10 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-shell flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <p className="font-mono text-[10.5px] tracking-[0.05em] text-fade">
        © {new Date().getFullYear()} {profile.name} · Built with React &amp; Vite
      </p>
      <ul className="flex items-center gap-6">
        {social.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-fade transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
)

export default Footer
