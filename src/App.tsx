import Header from './components/header'
import Hero from './components/hero'
import Work from './components/work'
import Experience from './components/experience'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default App
