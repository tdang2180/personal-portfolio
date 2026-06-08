import { type ReactNode } from 'react'
import { FallingLeaf } from './FallingLeaf'
import { Footer } from './Footer'
import { Header } from './Header'
import { SectionRail } from './SectionRail'

/** Toggle left rail + falling leaf when you want full-width content (e.g. 3-col projects). */
const SHOW_SIDE_DECOR = false

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased">
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
