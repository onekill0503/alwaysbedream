import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
  achievement?: string
  size: 'lg' | 'md' | 'sm'
}

const projects: Project[] = [
  {
    title: "PhisGuard",
    description:
      "AI-powered blockchain security protocol using EigenLayer AVS and EIP-7702 to intercept and validate transactions in real-time. Protects users from phishing attacks with autonomous AI detection.",
    tech: ["Solidity", "TypeScript", "Rust", "Python", "EigenLayer", "EIP-7702"],
    github: "https://github.com/onekill0503/phisguard",
    live: "https://ethglobal.com/showcase/phisguard-eip7702-abbry",
    achievement: "Finalist — ETHGlobal Agentic Ethereum",
    size: "lg",
  },
  {
    title: "FortuPool",
    description:
      "No-loss lottery protocol on blockchain. Users deposit funds for weekly prize draws while maintaining their principal. Uses Chainlink VRF for verifiable randomness and LayerZero for cross-chain deposits.",
    tech: ["Solidity", "Foundry", "Chainlink VRF", "LayerZero", "Next.js"],
    github: "https://github.com/onekill0503/fortupool",
    live: "https://fortupool.vercel.app",
    size: "md",
  },
  {
    title: "Giftify",
    description:
      "Decentralized investment gifting platform. Donors earn yield through sUSDe staking while supporting creators via Merkle Tree-based allocation.",
    tech: ["Solidity", "Foundry", "USDe", "Merkle Tree"],
    github: "https://github.com/onekill0503/giftify",
    size: "md",
  },
  {
    title: "Hono.js Starter",
    description:
      "Production-ready backend starter with authentication, Drizzle ORM, Zod validation, and OpenTelemetry observability.",
    tech: ["Hono", "TypeScript", "Drizzle", "PostgreSQL", "Bun", "Zod"],
    github: "https://github.com/onekill0503/hono-js-starter",
    size: "sm",
  },
  {
    title: "EVM Auto Sender",
    description:
      "TypeScript library for automating EVM transactions — send ETH to randomly generated wallets or a specific address list.",
    tech: ["TypeScript", "Ethers.js", "EVM", "npm"],
    github: "https://github.com/onekill0503/evm-auto-sender",
    size: "sm",
  },
  {
    title: "Anonymous Chat Bot",
    description:
      "Telegram bot for anonymous messaging. Users can chat without revealing their identity.",
    tech: ["JavaScript", "Node.js", "Telegram Bot API"],
    github: "https://github.com/onekill0503/anonimchat-clone",
    size: "sm",
  },
  {
    title: "Ethereum Gas Alert",
    description:
      "Telegram bot that monitors Ethereum gas prices and sends alerts when they reach thresholds.",
    tech: ["Python", "Telegram Bot API", "Ethereum", "Web3"],
    github: "https://github.com/onekill0503/ethereum_gas_alert",
    size: "sm",
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function BentoCard({ project }: { project: Project }) {
  const isLg = project.size === 'lg'
  const isMd = project.size === 'md'

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 flex flex-col ${
        isLg
          ? 'md:col-span-2 md:row-span-2'
          : isMd
          ? 'md:row-span-2'
          : ''
      }`}
    >
      {/* Colored top edge */}
      <div className={`h-1 w-full transition-opacity duration-300 ${
        isLg
          ? 'bg-gradient-to-r from-red-500 via-red-400 to-transparent'
          : isMd
          ? 'bg-gradient-to-r from-black via-gray-500 to-transparent'
          : 'bg-gradient-to-r from-gray-400 to-transparent'
      } opacity-0 group-hover:opacity-100`} />

      <div className={`flex flex-col flex-grow ${isLg ? 'p-8 sm:p-10' : isMd ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className={`font-bold text-gray-900 ${
            isLg ? 'text-2xl sm:text-3xl' : isMd ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}>
            {project.title}
          </h3>

          {/* Links */}
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-black hover:border-gray-900 transition-colors"
                aria-label="Live demo"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Achievement */}
        {project.achievement && (
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-semibold text-amber-700">{project.achievement}</span>
          </div>
        )}

        {/* Description */}
        <p className={`text-gray-600 leading-relaxed flex-grow ${
          isLg ? 'text-base sm:text-lg mb-8' : isMd ? 'text-sm sm:text-base mb-6' : 'text-sm mb-4'
        }`}>
          {project.description}
        </p>

        {/* Tech stack — pushed to bottom */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`font-medium text-gray-500 bg-gray-100 rounded-md px-2.5 py-1 group-hover:text-gray-700 group-hover:bg-gray-50 transition-colors ${
                isLg ? 'text-xs' : 'text-[11px]'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Selected
            <br />
            <span className="text-gray-400">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            A collection of projects spanning blockchain, full-stack development,
            and developer tooling — built with passion and attention to detail.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ staggerChildren: 0.07 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 sm:gap-5"
        >
          {projects.map((project) => (
            <BentoCard key={project.title} project={project} />
          ))}
        </motion.div>

        {/* Github Contributions embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 sm:mt-16 w-full overflow-x-auto"
        >
          <iframe
            src="https://jandee.vercel.app/onekill0503?scheme=light&weeks=true&footer=true&margin=3&redias=2"
            width="100%"
            height="170"
            style={{ border: 'none', minWidth: '700px' }}
            title="GitHub Contributions"
            loading="lazy"
          />
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-14 flex justify-center"
        >
          <a
            href="https://github.com/onekill0503"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            <span
              className="bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #9ca3af, #111827, #ef4444, #111827, #9ca3af)',
              }}
            >
              View more on GitHub
            </span>
            <svg
              className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
