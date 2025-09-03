import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 xl:px-16 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-pink-100 to-red-100 rounded-full blur-3xl opacity-70"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          style={{
            top: '10%',
            right: '10%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50"
          animate={{
            x: mousePosition.x * -0.03,
            y: mousePosition.y * -0.03,
          }}
          style={{
            bottom: '20%',
            left: '5%',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10"
      >
        {/* Left Content */}
        <div className="space-y-8">

          <motion.div variants={itemVariants}>
            <p className="text-base sm:text-lg text-gray-600 mb-4">Hello World, I am</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none">
              <span className="text-black">aji</span>
              <span className="text-red-500">.</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-lg leading-relaxed">
              I am a <span className="font-semibold text-black">full-stack developer</span> during daytime
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>& work with <span className="font-semibold text-black">blockchain</span> during nights.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              onClick={handleContactClick}
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-base sm:text-lg"
            >
              schedule free consultation
            </button>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-gray-200"
          >
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Email</h4>
              <p className="text-xs sm:text-sm text-gray-600 break-all sm:break-normal">business@alwaysbedream.dev</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Phone</h4>
              <p className="text-xs sm:text-sm text-gray-600">+62 000-000-0000</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">Location</h4>
              <p className="text-xs sm:text-sm text-gray-600">Malang, Indonesia</p>
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div 
          variants={itemVariants}
          className="relative flex items-center justify-center order-first lg:order-last"
        >
          {/* Large graphic element inspired by the designs */}
          <div className="relative">
            {/* Background shapes */}
            <motion.div
              className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-gray-900 via-gray-700 to-black rounded-full opacity-90"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-16 right-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EVM
            </motion.div>
            
            <motion.div
              className="absolute bottom-20 left-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              De-Fi
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 -right-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              animate={{ 
                x: [0, 10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              Cloud
            </motion.div>
            
            <motion.div
              className="absolute bottom-1/3 -left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
              animate={{ 
                x: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
            >
              Web3
            </motion.div>

            {/* Additional floating elements */}
            <motion.div
              className="absolute top-24 left-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
              animate={{ 
                y: [0, -8, 0],
                x: [0, 5, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
            >
              Smart Contracts
            </motion.div>
            
            <motion.div
              className="absolute bottom-32 right-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
              animate={{ 
                y: [0, 8, 0],
                x: [0, -5, 0],
                rotate: [0, -8, 0]
              }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
            >
              React
            </motion.div>

            {/* Profile placeholder */}
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-transparent from-gray-300 to-gray-500 flex items-center justify-center">
                {/* <div className="text-6xl">👨‍💻</div> */}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero