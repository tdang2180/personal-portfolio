import { useEffect, useState, type ReactNode } from 'react'
import { FallingLeaf } from './FallingLeaf'
import { Footer } from './Footer'
import { Header } from './Header'
import { SectionRail } from './SectionRail'

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
      <SectionRail />
      <FallingLeaf />
      <main id="main">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
