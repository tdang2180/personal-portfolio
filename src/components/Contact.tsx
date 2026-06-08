import { useState, type ComponentType } from 'react'
import { site, type SocialIcon, type SocialLink } from '../content/site'
import { EmailIcon, GitHubIcon, LinkedInIcon, ResumeIcon } from './SocialIcons'
import { ResumeModal } from './ResumeModal'

const ICONS: Record<SocialIcon, ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  resume: ResumeIcon,
}

const ICON_ONLY: SocialIcon[] = ['github', 'linkedin', 'email']

const textLinkClass =
  'group inline-flex h-11 items-center gap-2 rounded-xl border border-card-border bg-card px-4 text-sm font-medium text-foreground transition hover:border-accent/40 hover:bg-surface-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function isExternal(href: string) {
  return href.startsWith('http')
}

function linkTarget(link: SocialLink) {
  if (isExternal(link.href)) {
    return { target: '_blank' as const, rel: 'noopener noreferrer' }
  }
  return {}
}

function IconButton({ link }: { link: SocialLink }) {
  const Icon = ICONS[link.icon]
  const external = isExternal(link.href)

  return (
    <a
      href={link.href}
      {...linkTarget(link)}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-card-border bg-card text-foreground transition hover:border-accent/40 hover:bg-surface-solid hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Icon className="h-5 w-5 transition group-hover:text-accent-link-hover" />
      <span className="sr-only">
        {link.label}
        {external ? ' (opens in new tab)' : ''}
      </span>
    </a>
  )
}

function TextLink({ link, onResumeOpen }: { link: SocialLink; onResumeOpen: () => void }) {
  const Icon = ICONS[link.icon]

  if (link.icon === 'resume') {
    return (
      <button type="button" onClick={onResumeOpen} className={textLinkClass}>
        <Icon className="h-5 w-5 shrink-0 text-accent transition group-hover:text-accent-link-hover" />
        <span>{link.label}</span>
        <span className="text-accent transition group-hover:text-accent-link-hover" aria-hidden>
          →
        </span>
        <span className="sr-only"> (opens preview)</span>
      </button>
    )
  }

  const opensNewTab = isExternal(link.href)

  return (
    <a href={link.href} {...linkTarget(link)} className={textLinkClass}>
      <Icon className="h-5 w-5 shrink-0 text-accent transition group-hover:text-accent-link-hover" />
      <span>{link.label}</span>
      <span className="text-accent transition group-hover:text-accent-link-hover" aria-hidden>
        →
      </span>
      {opensNewTab ? <span className="sr-only"> (opens in new tab)</span> : null}
    </a>
  )
}

export function Contact() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const resumeLink = site.social.find((link) => link.icon === 'resume')

  const iconLinks = site.social.filter((link) => ICON_ONLY.includes(link.icon))
  const textLinks = site.social.filter((link) => !ICON_ONLY.includes(link.icon))

  return (
    <div id="contact" className="mt-5">
      <ul aria-label="Contact links" className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {iconLinks.map((link) => (
          <li key={link.href}>
            <IconButton link={link} />
          </li>
        ))}
        {textLinks.length > 0 ? (
          <li className="mt-1 flex w-full items-center border-t border-border-strong pt-3 sm:mt-0 sm:w-auto sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3">
            {textLinks.map((link) => (
              <TextLink
                key={link.href}
                link={link}
                onResumeOpen={() => setResumeOpen(true)}
              />
            ))}
          </li>
        ) : null}
      </ul>

      {resumeLink ? (
        <ResumeModal
          open={resumeOpen}
          onClose={() => setResumeOpen(false)}
          src={resumeLink.href}
          title={`${site.name} — Resume`}
        />
      ) : null}

      <p className="mt-6 text-sm text-subtle-deep">{site.location}</p>
    </div>
  )
}
