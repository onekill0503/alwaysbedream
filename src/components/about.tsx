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
    "framermotion",
    "vercel",
    "git",
    "github",
    "visualstudiocode",
    "figma",
    "docker",
    "aws",
    "solidity",
    "ethereum",
    "docker",
    "vault",
    "kubernetes",
    "bun",
    "hono"
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
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">About</h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>
                  I&apos;m a full-stack developer passionate about creating exceptional 
                  digital experiences. With 5+ years in the industry, I&apos;ve worked 
                  with startups and established brands across various sectors.
                </p>
                <p>
                  My expertise spans modern web technologies and blockchain development. 
                  I particularly enjoy the intersection of traditional web development 
                  and emerging Web3 technologies.
                </p>
                <p>
                  Currently based in Malang, Indonesia, I work with clients 
                  globally, bringing innovative ideas to life through clean, 
                  performant code.
                </p>
              </div>
              
              <div>
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