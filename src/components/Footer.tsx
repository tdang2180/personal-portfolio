import { site } from '../content/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-strong/60 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-subtle-deep">
          © {year} {site.name}. Built with React & Tailwind.
        </p>
        <a
          href="#top"
          className="text-sm font-medium text-subtle transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
