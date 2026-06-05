import { site } from '../content/site'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-strong/60 py-10">
      <SectionContainer
        width={SECTION_WIDTH.footer}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-sm text-subtle-deep">
          © {year} {site.name}. Built with React & Tailwind.
        </p>
        <a
          href="#top"
          className="text-sm font-medium text-subtle transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to top
        </a>
      </SectionContainer>
    </footer>
  )
}
