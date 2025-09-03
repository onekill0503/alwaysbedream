import { MotionDiv, AnimatePresence } from './components/motion'
import { useState, useEffect } from 'react'
import Header from './components/header'
import Banner from './components/banner'
import About from './components/about'
import Experience from './components/experience'
import Portfolio from './components/portfolio'
// import Blog from './components/blog'
import Contact from './components/contact'
import Loading from './components/loading'
import { SmoothCursor } from './components/ui/smooth-cursor'
import { ScrollProgress } from './components/magicui/scroll-progress'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Simulate loading time and wait for DOM to be ready
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000) // Minimum loading time
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <MotionDiv
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SmoothCursor />
            <ScrollProgress className="top-20 h-0.5 z-[60]" />
            <Header />
            
            <main>
              <Banner />
              <About />
              <Experience />
              <Portfolio />
              {/* <Blog /> */}
              <Contact />
            </main>

            <footer className="py-12 border-t border-gray-200">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                  <div>
                    © {new Date().getFullYear()} Aji Dwi Prastio. All rights reserved.
                  </div>
                  <div className="mt-4 md:mt-0">
                    Built with Vite + React & Tailwind CSS
                  </div>
                </div>
              </div>
            </footer>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App