import { motion } from 'framer-motion'
import { IconCloud } from './magicui/icon-cloud'

const About: React.FC = () => {
  const slugs: string[] = [
    "typescript",
    "javascript",
    "react",
    "nextdotjs",
    "nodedotjs",
    "express",
    "postgresql",
    "mongodb",
    "prisma",
    "tailwindcss",
    "docker",
    "kubernetes",
    "linux",
    "git",
    "github",
    "githubactions",
    "solidity",
    "ethereum",
    "foundry",
    "rust",
    "python",
    "php",
    "laravel",
    "bun",
    "hono",
    "vercel",
  ]

  const images: string[] = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}.svg`,
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              About
              <br />
              <span className="text-gray-400">Me</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed break-words min-w-0">
                <p>
                  Backend developer and DevOps engineer with <span className="font-semibold text-gray-900">6+ years</span> of
                  hands-on experience. I build web applications during the day and
                  write smart contracts at night.
                </p>
                <p>
                  My core stack revolves around <span className="font-semibold text-gray-900">TypeScript</span>, <span className="font-semibold text-gray-900">Node.js</span>,
                  and <span className="font-semibold text-gray-900">Solidity</span> — with deep knowledge in DevOps,
                  database management, and blockchain infrastructure. I&apos;m adaptable,
                  always eager to pick up new technologies and push them to production.
                </p>
                <p>
                  Based in Indonesia, I thrive in both structured company environments
                  and fast-paced open-source communities. I believe great software comes
                  from clean architecture, reliable pipelines, and code that speaks for itself.
                </p>
              </div>
              
              <div className="min-w-0">
                <div className="relative flex h-64 sm:h-72 lg:h-80 w-full items-center justify-center overflow-hidden">
                  <IconCloud images={images} />
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default About