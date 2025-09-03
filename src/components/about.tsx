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
    "ethereum"
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
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
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
                <div className="relative flex h-80 w-full items-center justify-center overflow-hidden">
                  <IconCloud images={images} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="border-t border-gray-200 pt-16">
            <h3 className="text-xl font-semibold mb-8">Experience</h3>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-32 text-sm text-gray-500">2020 - Present</div>
                <div className="flex-1">
                  <h4 className="font-semibold">Freelance Developer</h4>
                  <p className="text-gray-600 mt-1">
                    Full-stack development for various clients, specializing in React, 
                    Next.js, and blockchain integrations.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-32 text-sm text-gray-500">2019 - 2020</div>
                <div className="flex-1">
                  <h4 className="font-semibold">Blockchain Validator</h4>
                  <p className="text-gray-600 mt-1">
                    Active validator and tester for multiple blockchain networks 
                    and cryptocurrency platforms.
                  </p>
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