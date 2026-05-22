import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'

export function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <About />
    </>
  )
}
