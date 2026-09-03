export const githubUser = 'onekill0503'

export const profile = {
  name: 'Aji Dwi Prastio',
  kicker: 'Backend & DevOps engineer',
  tagline: 'Smart contracts after hours.',
  email: 'business@alwaysbedream.dev',
  location: 'Malang, Indonesia',
  timezone: 'UTC+7',
  availability: 'Open to freelance',
}

export interface Segment {
  text: string
  strong?: boolean
}

export const about = {
  /**
   * Promoted out of the middle of the old third paragraph. It is the most
   * human sentence on the site, so it leads the section.
   */
  lead: {
    before: 'I build web apps by day and write ',
    accent: 'smart contracts',
    after: ' at night.',
  },
  paragraphs: [
    [
      { text: 'Backend and DevOps by trade, ' },
      { text: 'six years', strong: true },
      { text: ' of it. Currently keeping infrastructure, pipelines and databases running at ' },
      { text: 'BIGIO.ID', strong: true },
      { text: ' in Malang, Indonesia.' },
    ],
    [
      { text: 'The rest of the time building protocols in hackathons. Core stack is ' },
      { text: 'TypeScript', strong: true },
      { text: ', ' },
      { text: 'Node.js', strong: true },
      { text: ' and ' },
      { text: 'Solidity', strong: true },
      { text: '.' },
    ],
  ] as Segment[][],
}

export const links = {
  github: `https://github.com/${githubUser}`,
  linkedin: 'https://www.linkedin.com/in/aji-dwi-prasetio/',
  x: 'https://x.com/0xalwaysbedream',
  resume: '/resume.pdf',
}

/**
 * Flip to `true` in the same change that adds `public/resume.pdf`.
 * A resume link that 404s is worse than no resume link, so every
 * resume CTA on the site is behind this one flag.
 *
 * Annotated `boolean` on purpose: without the annotation TypeScript narrows
 * this to the literal type `false`, and every `HAS_RESUME &&` guard downstream
 * is flagged as dead code.
 */
export const HAS_RESUME: boolean = false

export const sections = [
  { id: 'work', num: '01', label: 'Work' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'about', num: '03', label: 'About' },
] as const

export const contactSection = { id: 'contact', num: '04', label: 'Contact' }

export interface ProjectLink {
  label: string
  href: string
}

export interface WorkProject {
  slug: string
  title: string
  achievement: string
  description: string
  tech: string[]
  links: ProjectLink[]
}

export const work: WorkProject[] = [
  {
    slug: 'scalex',
    title: 'ScaleX Protocol',
    achievement: '2nd Place — BuildOnBase Hackathon',
    description:
      'A CLOB decentralised exchange wired into a lending protocol, so capital never sits idle. Resting limit orders and deposits earn yield through automated staking until they are filled.',
    tech: ['Solidity', 'TypeScript', 'React', 'EVM', 'Solana'],
    links: [
      {
        label: 'Announcement',
        href: 'https://x.com/ScaleX_money/status/2020410616591315428',
      },
    ],
  },
  {
    slug: 'phisguard',
    title: 'PhisGuard',
    achievement: 'Finalist — ETHGlobal Agentic Ethereum',
    description:
      'A security layer that intercepts a transaction before it is signed and validates it in real time, using EigenLayer AVS and EIP-7702. Autonomous agents flag phishing attempts that a wallet UI would wave through.',
    tech: ['Solidity', 'Rust', 'Python', 'TypeScript', 'EigenLayer', 'EIP-7702'],
    links: [
      { label: 'GitHub', href: `https://github.com/${githubUser}/phisguard` },
      {
        label: 'Showcase',
        href: 'https://ethglobal.com/showcase/phisguard-eip7702-abbry',
      },
    ],
  },
  {
    slug: 'gtx',
    title: 'GTX — Great Trading eXperience',
    achievement: '5th Place — Espresso Build & Brew',
    description:
      'A permissionless CLOB exchange with O(log n) order matching built on red-black trees. I wrote the contracts, the front end, and the indexer that turns raw events into candlestick and market data.',
    tech: ['Solidity', 'TypeScript', 'React', 'Ponder', 'Foundry'],
    links: [
      {
        label: 'Announcement',
        href: 'https://x.com/EspressoSys/status/1910419217448657221',
      },
    ],
  },
]

export interface Repo {
  name: string
  descriptor: string
  href: string
}

export const alsoBuilt: Repo[] = [
  {
    name: 'FortuPool',
    descriptor: 'No-loss lottery · Chainlink VRF · LayerZero',
    href: `https://github.com/${githubUser}/fortupool`,
  },
  {
    name: 'Giftify',
    descriptor: 'Investment gifting · sUSDe yield · Merkle allocation',
    href: `https://github.com/${githubUser}/giftify`,
  },
  {
    name: 'Hono.js Starter',
    descriptor: 'Backend starter · Drizzle · Zod · OpenTelemetry',
    href: `https://github.com/${githubUser}/hono-js-starter`,
  },
  {
    name: 'EVM Auto Sender',
    descriptor: 'TypeScript library · scripted EVM transfers',
    href: `https://github.com/${githubUser}/evm-auto-sender`,
  },
]

export interface Role {
  period: string
  title: string
  location: string
  tech: string[]
  current?: boolean
}

export interface EmployerGroup {
  company: string
  span: string
  roles: Role[]
}

export const experience: EmployerGroup[] = [
  {
    company: 'BIGIO.ID',
    span: 'Jan 2023 — Present · 3 yrs',
    roles: [
      {
        period: '2025 — Present',
        title: 'DevOps Engineer',
        location: 'Malang · On-site',
        tech: ['PostgreSQL', 'Docker', 'Linux', 'CI/CD'],
        current: true,
      },
      {
        period: '2023 — 2024',
        title: 'Back-end Developer',
        location: 'Yogyakarta · Full-time',
        tech: ['Node.js', 'REST API'],
      },
      {
        period: '2023',
        title: 'Back-end Developer',
        location: 'Yogyakarta · Part-time',
        tech: ['API Testing', 'Documentation'],
      },
    ],
  },
  {
    company: 'Freelance',
    span: 'Jan 2018 — Feb 2021 · 3 yrs',
    roles: [
      {
        period: '2018 — 2021',
        title: 'Full-stack Developer',
        location: 'Remote',
        tech: ['React.js', 'Node.js', 'JavaScript'],
      },
    ],
  },
]

/**
 * Closes the Experience section. Without it the ledger implies 2025 was
 * DevOps alone, which undersells a year holding three protocols and two
 * placements. Rendered as one line, not as duplicated project copy.
 */
export const experienceCrossRef = {
  lead: 'Through 2025, alongside the DevOps role, I built',
  projects: ['ScaleX', 'PhisGuard', 'GTX'],
  tail: 'see Work',
}

export interface StackRow {
  label: string
  items: string[]
}

export const stack: StackRow[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Rust', 'Python', 'PHP'],
  },
  { label: 'Frontend', items: ['React', 'Next.js', 'Tailwind'] },
  { label: 'Backend', items: ['Node.js', 'Hono', 'Express', 'Laravel', 'Prisma'] },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'Drizzle'] },
  { label: 'Chain', items: ['Solidity', 'Foundry', 'Ethereum', 'EigenLayer'] },
  {
    label: 'Infra',
    items: ['Docker', 'Kubernetes', 'Linux', 'GitHub Actions', 'Vercel', 'Bun'],
  },
]
