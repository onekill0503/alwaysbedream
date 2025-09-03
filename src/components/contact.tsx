import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface MousePosition {
  x: number
  y: number
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const mailtoLink = `mailto:business@alwaysbedream.dev?subject=Project Inquiry from ${formData.name}&body=${formData.message}%0D%0A%0D%0AContact: ${formData.email}`
    window.location.href = mailtoLink
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  const scrollToForm = () => {
    document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="contact" className="min-h-screen py-24 px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-red-200/40 to-pink-200/40 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.03,
            y: mousePosition.y * 0.03,
          }}
          style={{
            top: '20%',
            right: '10%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          style={{
            bottom: '30%',
            left: '15%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-none">
              Let&apos;s work
              <br />
              <span className="text-red-500">together</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I&apos;m currently available for freelance projects and exciting collaborations. 
              Let&apos;s create something amazing together.
            </p>
            
            {/* CTA Button */}
            <motion.button
              onClick={scrollToForm}
              className="mt-8 bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Call
            </motion.button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-8">Get in touch</h3>
                <div className="space-y-8">
                  <motion.div 
                    className="group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">Email</h4>
                    <a 
                      href="mailto:business@alwaysbedream.dev"
                      className="text-lg text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      business@alwaysbedream.dev
                    </a>
                  </motion.div>
                  
                  <motion.div 
                    className="group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">Phone</h4>
                    <p className="text-lg text-gray-600">+62 000-000-0000</p>
                  </motion.div>

                  <motion.div 
                    className="group"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">Location</h4>
                    <p className="text-lg text-gray-600">Malang, Indonesia</p>
                  </motion.div>
                </div>
              </div>

              {/* Availability Status */}
              <motion.div 
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-800">Available for work</span>
                </div>
                <p className="text-gray-600">
                  Currently open for new projects and collaborations. 
                  Typical response time: within 24 hours.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              id="contact-form"
              variants={itemVariants} 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/40"
            >
              <h3 className="text-2xl font-bold mb-8">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-500"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact