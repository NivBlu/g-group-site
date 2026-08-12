import { Calculator } from './components/Calculator'
import { Compare } from './components/Compare'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Hub } from './components/Hub'
import { LeadForm } from './components/LeadForm'
import { Location } from './components/Location'
import { Marquee } from './components/Marquee'
import { Multiplier } from './components/Multiplier'
import { Nav } from './components/Nav'
import { Pillars } from './components/Pillars'
import { Planning } from './components/Planning'
import { Pricing } from './components/Pricing'
import { ScrollProgress } from './components/ScrollProgress'
import { StickyBar } from './components/StickyBar'
import { Trust } from './components/Trust'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Multiplier />
        <Pillars />
        <Calculator />
        <Location />
        <Hub />
        <Planning />
        <Compare />
        <Trust />
        <Pricing />
        <LeadForm />
      </main>

      <Footer />
      <StickyBar />
    </>
  )
}
