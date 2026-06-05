import { useEffect, useState, type ReactNode } from 'react'
import { FallingLeaf } from './FallingLeaf'
import { Footer } from './Footer'
import { Header } from './Header'
import { SectionRail } from './SectionRail'

/** Toggle left rail + falling leaf when you want full-width content (e.g. 3-col projects). */
const SHOW_SIDE_DECOR = false

export function Layout({ children }: { children: ReactNode }) {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      }
    })
  }, [hash])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Header />
      {SHOW_SIDE_DECOR ? <SectionRail /> : null}
      {SHOW_SIDE_DECOR ? <FallingLeaf /> : null}
      <main id="main">
        {/* Side padding only — each section sets its own max-width in SectionContainer */}
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
