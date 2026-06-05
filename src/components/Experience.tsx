import { useState } from 'react'
import { site, type ExperienceEntry } from '../content/site'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'
import { WebsiteIcon } from './SocialIcons'

const companyIconLinkClass =
  'inline-flex size-23 shrink-0 items-center justify-center overflow-hidden rounded-full border-5 border-accent/35 bg-white text-accent transition hover:border-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function CompanySiteLink({ link }: { link: NonNullable<ExperienceEntry['link']> }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={companyIconLinkClass}
    >
      {imgFailed ? (
        <WebsiteIcon className="h-5 w-5" />
      ) : (
        <img
          src={link.iconSrc}
          alt=""
          className="size-full object-contain p-1"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="sr-only">{link.label} (opens in new tab)</span>
    </a>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 py-16 sm:py-10"
      aria-labelledby="experience-heading"
    >
      <SectionContainer width={SECTION_WIDTH.experience}>
      <h2
        id="experience-heading"
        className="text-xs font-bold uppercase tracking-[0.2em]"
      >
        Experience
      </h2>
      <ol className="relative mt-12 border-l border-card-border pl-8 sm:pl-10">
        {site.experience.map((job, index) => (
          <li
            key={`${job.organization}-${job.period}`}
            className={`relative ${index < site.experience.length - 1 ? 'pb-14' : ''}`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">{job.role}</h3>
              <p className="text-sm tabular-nums text-subtle">{job.period}</p>
            </div>

            <div className="mt-1 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{job.organization}</p>
                {job.location ? (
                  <p className="mt-0.5 text-sm text-muted">{job.location}</p>
                ) : null}
              </div>

              {job.link ? <CompanySiteLink link={job.link} /> : null}
            </div>

            {job.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-marker">
                {job.bullets.map((bullet, i) => (
                  <li key={`${job.period}-${i}`}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
      </SectionContainer>
    </section>
  )
}
