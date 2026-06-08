import { useState } from 'react'
import type { Project, ProjectImage } from '../content/site'
import { site } from '../content/site'
import { ImageLightbox } from './ImageLightbox'
import { ProjectImageCarousel } from './ProjectImageCarousel'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'
import { GitHubIcon, WebsiteIcon, YouTubeIcon } from './SocialIcons'

const projectLinkClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-card-border bg-card text-muted transition hover:border-accent/40 hover:bg-surface-solid hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\//, '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtube.com')) {
      const id =
        u.searchParams.get('v') ?? u.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {
    return null
  }
  return null
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    project.liveUrl
      ? { href: project.liveUrl, label: 'Live website', Icon: WebsiteIcon }
      : null,
    project.repoUrl ? { href: project.repoUrl, label: 'Source code', Icon: GitHubIcon } : null,
    project.videoUrl
      ? { href: project.videoUrl, label: 'Video demo', Icon: YouTubeIcon }
      : null,
  ].filter((item) => item !== null)

  if (links.length === 0) return null

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Links for ${project.title}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={projectLinkClass}
        >
          <Icon className="h-[1.15rem] w-[1.15rem] transition group-hover:text-accent-link-hover" />
          <span className="sr-only">
            {label} (opens in new tab)
          </span>
        </a>
      ))}
    </div>
  )
}

function projectImages(project: Project): ProjectImage[] {
  const fromList = project.images?.filter((img) => img.src.trim()) ?? []
  if (fromList.length > 0) return fromList

  const single = project.imageSrc?.trim()
  if (single) {
    return [{ src: single, alt: project.imageAlt }]
  }

  return []
}

function ProjectMedia({ project }: { project: Project }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const images = projectImages(project)
  const embedUrl = project.videoUrl ? youtubeEmbedUrl(project.videoUrl) : null

  if (!embedUrl && images.length === 0) return null

  return (
    <div className="space-y-3">
      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        index={imageIndex}
        onIndexChange={setImageIndex}
        projectTitle={project.title}
      />
      {embedUrl ? (
        <div className="overflow-hidden rounded-xl border border-card-border bg-surface-solid">
          <iframe
            src={embedUrl}
            title={`${project.title} video`}
            className="aspect-video w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}

      {images.length > 0 ? (
        <ProjectImageCarousel
          images={images}
          projectTitle={project.title}
          index={imageIndex}
          onIndexChange={setImageIndex}
          onZoom={(i) => {
            setImageIndex(i)
            setLightboxOpen(true)
          }}
        />
      ) : null}
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-border-strong/60 py-16 sm:py-10"
      aria-labelledby="projects-heading"
    >
      <SectionContainer width={SECTION_WIDTH.projects}>
      <h2
        id="projects-heading"
        className="text-xs font-bold uppercase tracking-[0.2em]"
      >
        Projects
      </h2>
      <ul className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-3">
        {site.projects.map((project) => (
          <li
            key={project.title}
            className="min-w-0 rounded-2xl border border-card-border bg-card p-4 shadow-sm shadow-black/10 transition hover:border-card-border-hover sm:p-5 dark:shadow-black/20"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {project.title}
              </h3>
              <ProjectLinks project={project} />
            </div>

            {project.description.trim() ? (
              <p className="mt-3 text-sm leading-relaxed sm:text-[15px]">
                {project.description.trim()}
              </p>
            ) : null}

            <div className="mt-4">
              <ProjectMedia project={project} />
              {project.tags.length > 0 ? (
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`Technologies for ${project.title}`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-flex rounded-full border border-card-border bg-surface px-2.5 py-0.5 text-xs lg:px-3 lg:py-1 lg:text-[14px]">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      </SectionContainer>
    </section>
  )
}
