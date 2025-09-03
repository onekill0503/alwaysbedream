import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scroller } from 'react-scroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const goto = (target: string) => {
    scroller.scrollTo(target, {
      duration: 800,
      smooth: true,
      offset: -100,
    })
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'portfolio', target: 'work' },
    { name: 'about me', target: 'about' },
    { name: 'my blog', target: 'blog' },
    { name: 'reviews', target: 'reviews' },
    { name: 'contact me', target: 'contact' },
  ]

  return (
    <>
      {/* Top Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-tight"
          >
            aji
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => goto(item.target)}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => goto('contact')}
            className="hidden lg:block bg-red-500 text-white px-4 xl:px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Schedule a Call
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1"
          >
            <span className={`block w-5 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t px-4 sm:px-6 py-6"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => goto(item.target)}
                  className="block w-full text-left py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-gray-100 last:border-0"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => goto('contact')}
                className="w-full mt-4 bg-red-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Schedule a Call
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Side Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      >
        <div className="flex flex-col space-y-6">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
            <span className="sr-only">LinkedIn</span>
            <a href="https://www.linkedin.com/in/aji-dwi-prasetio/" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
            <span className="sr-only">GitHub</span>
            <a href="https://github.com/onekill0503" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
            <span className="sr-only">Twitter</span>
            <a href="https://x.com/0xalwaysbedream" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
            <span className="sr-only">Instagram</span>
            <a href="https://instagram.com/alwaysbedream" target="_blank" rel="noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </button>
          
        </div>
      </motion.div>
    </>
  )
}

export default Header