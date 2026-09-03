import Header from './components/header'
import Hero from './components/hero'
import Work from './components/work'
import Experience from './components/experience'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { LazyMotion, domAnimation } from 'framer-motion'

function App() {
  return (
    // `domAnimation` is the animation-and-variants half of framer-motion; the
    // `m` components in the sections below stay inert without it. Loaded
    // eagerly rather than through a dynamic import because the hero animates
    // above the fold, and a late feature bundle would hold its first frame
    // at `initial` for the length of a round trip. `strict` makes a stray
    // `motion.*` import throw instead of silently pulling the full runtime
    // back into the bundle.
    <LazyMotion features={domAnimation} strict>
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
    </LazyMotion>
  )
}

export default App
