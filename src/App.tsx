import Header from './components/header'
import Hero from './components/hero'
import About from './components/about'
import Experience from './components/experience'
import Portfolio from './components/portfolio'
import Contact from './components/contact'
import { ScrollProgress } from './components/magicui/scroll-progress'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress className="top-[56px] sm:top-[76px] h-0.5 z-[60]" />
      <Header />

      <main>
        <Hero />
        <About />
        <Experience />
        <Portfolio />
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
      <SpeedInsights />
    </div>
  )
}

export default App
