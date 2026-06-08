import { site } from '../content/site'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { label: 'About', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  
] as const

const linkClass =
  'rounded-md px-3 py-2 text-base font-medium tracking-tight text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-lg'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-strong/80 bg-header-bg backdrop-blur-md">
      <SectionContainer
        width={SECTION_WIDTH.header}
        className="flex items-center justify-between gap-8 py-4 lg:gap-16"
      >
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-xl"
        >
          {site.name.split(' ')[0]}
        </a>
        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5 lg:gap-6">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center justify-end gap-6 sm:gap-8 lg:gap-10">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </SectionContainer>
    </header>
  )
}
