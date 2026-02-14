import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ExperienceItem {
  period: string
  role: string
  company: string
  type: 'work' | 'community'
  description: string
  tech: string[]
  achievement?: string
  achievementLink?: string
}

const experiences: ExperienceItem[] = [
  {
    period: "Nov 2025 — Present",
    role: "Smart Contract & Full-Stack Developer",
    company: "ScaleX Protocol",
    type: "community",
    description:
      "Building a CLOB DEX integrated with lending protocol for capital-efficient DeFi trading. Idle limit orders and deposits automatically earn yield through automated staking.",
    tech: ["Solidity", "TypeScript", "React", "EVM", "Solana"],
    achievement: "2nd Place — BuildOnBase Hackathon",
    achievementLink: "https://x.com/ScaleX_money/status/2020410616591315428",
  },
  {
    period: "Jan 2025 — Present",
    role: "DevOps Engineer",
    company: "BIGIO.ID",
    type: "work",
    description:
      "Managed infrastructure, CI/CD pipelines, and deployment workflows. Maintained PostgreSQL databases and GitHub-based development operations on-site in Malang.",
    tech: ["PostgreSQL", "GitHub", "Docker", "Linux", "CI/CD"],
  },
  {
    period: "Jan 2025 — Feb 2025",
    role: "Smart Contract Developer",
    company: "PhisGuard — ETHGlobal Agentic Ethereum",
    type: "community",
    description:
      "Built an AI-powered blockchain security protocol using EigenLayer AVS and EIP-7702 to intercept and validate transactions in real-time, protecting users from phishing attacks.",
    tech: ["Solidity", "TypeScript", "Rust", "Python", "EigenLayer", "EIP-7702"],
    achievement: "Finalist — ETHGlobal Agentic Ethereum",
    achievementLink: "https://ethglobal.com/showcase/phisguard-eip7702-abbry",
  },
  {
    period: "Feb 2025 — Nov 2025",
    role: "Smart Contract & Full-Stack Developer",
    company: "GTX — Great Trading eXperience",
    type: "community",
    description:
      "Developed a permissionless CLOB-based DEX with O(log n) matching algorithm using Red-Black Trees. Built frontend, smart contracts, and indexer for candlestick/market data.",
    tech: ["Solidity", "TypeScript", "React", "Ponder", "Foundry"],
    achievement: "5th Place — Espresso Build & Brew Hackathon",
    achievementLink: "https://x.com/EspressoSys/status/1910419217448657221",
  },
  {
    period: "Mar 2023 — Dec 2024",
    role: "Back-end Developer",
    company: "BIGIO.ID",
    type: "work",
    description:
      "Designed and implemented robust back-end systems, RESTful APIs, and ensured technical integrity of web-based solutions. Full-time on-site in Yogyakarta.",
    tech: ["Node.js", "REST API", "Back-End Web Development"],
  },
  {
    period: "Jan 2023 — Feb 2023",
    role: "Back-end Developer",
    company: "BIGIO.ID",
    type: "work",
    description:
      "Part-time role focused on API testing, documentation, and back-end development support. Hybrid work in Yogyakarta.",
    tech: ["API Testing", "API Documentation"],
  },
  {
    period: "Jan 2018 — Feb 2021",
    role: "Full-stack Developer",
    company: "Freelance",
    type: "work",
    description:
      "Built web applications for various clients over 3 years. Delivered end-to-end solutions from frontend interfaces to server-side logic and database design.",
    tech: ["React.js", "Node.js", "JavaScript"],
  },
]

type FilterType = 'all' | 'work' | 'community'

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = filter === 'all' ? experiences : experiences.filter(e => e.type === filter)
  const active = filtered[activeIndex] || filtered[0]

  const handleFilterChange = (f: FilterType) => {
    setFilter(f)
    setActiveIndex(0)
  }

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Experience
            <br />
            <span className="text-gray-400">Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mb-6">
            Professional growth across back-end engineering, DevOps, and
            blockchain development — from enterprise systems to hackathon-winning DeFi protocols.
          </p>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {(['all', 'work', 'community'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'All' : f === 'work' ? 'Company' : 'Community'}
                <span className="ml-1.5 text-xs opacity-60">
                  {f === 'all' ? experiences.length : experiences.filter(e => e.type === f).length}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main layout: sidebar list + detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-0"
        >
          {/* Left: Scrollable role list */}
          <div className="lg:border-r border-gray-200 lg:pr-0">
            <div className="flex lg:flex-col gap-3 lg:gap-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
              {filtered.map((exp, i) => {
                const isActive = i === activeIndex
                return (
                  <motion.button
                    key={`${exp.company}-${exp.period}`}
                    onClick={() => setActiveIndex(i)}
                    layout
                    className={`relative flex-shrink-0 text-left lg:w-full px-5 py-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-black text-white lg:bg-transparent lg:text-black'
                        : 'bg-gray-50 lg:bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hover:bg-gray-50'
                    } rounded-xl lg:rounded-none lg:border-b border-gray-100 last:border-0`}
                  >
                    {/* Active indicator for desktop */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-black rounded-l-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        exp.period.includes('Present')
                          ? 'bg-emerald-500'
                          : isActive ? 'bg-black lg:bg-gray-400' : 'bg-gray-300'
                      }`} />
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${
                          isActive ? 'lg:text-gray-900' : ''
                        }`}>
                          {exp.company.split(' — ')[0]}
                        </p>
                        <p className={`text-xs truncate ${
                          isActive ? 'text-gray-200 lg:text-gray-500' : 'text-gray-400'
                        }`}>
                          {exp.role} <span className="hidden lg:inline">· {exp.period.split(' — ')[0]}</span>
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="lg:pl-10 min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.company}-${active.period}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Period + Type badge */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-400">{active.period}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    active.type === 'community'
                      ? 'text-blue-600 border-blue-200 bg-blue-50'
                      : 'text-gray-600 border-gray-200 bg-gray-50'
                  }`}>
                    {active.type === 'community' ? 'Community' : 'Company'}
                  </span>
                  {active.period.includes('Present') && (
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-600">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Active
                    </span>
                  )}
                </div>

                {/* Role + Company */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {active.role}
                </h3>
                <p className="text-lg text-gray-500 mb-6">{active.company}</p>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
                  {active.description}
                </p>

                {/* Achievement */}
                {active.achievement && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6"
                  >
                    <svg className="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {active.achievementLink ? (
                      <a
                        href={active.achievementLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-amber-900 hover:underline"
                      >
                        {active.achievement}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-amber-900">{active.achievement}</span>
                    )}
                  </motion.div>
                )}

                {/* Tech stack */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {active.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1.5 hover:bg-gray-200 transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
