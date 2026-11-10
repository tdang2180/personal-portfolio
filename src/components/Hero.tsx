import { site } from '../content/site'
import { Contact } from './Contact'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'

export function Hero() {
  const media = site.heroMedia

  return (
    <section
      id="top"
      className="scroll-mt-24 border-b border-border-strong/60 pb-12 pt-12 sm:pb-10 sm:pt-16"
      aria-labelledby="hero-heading"
    >
      <SectionContainer width={SECTION_WIDTH.hero}>
        <div className="grid gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-12 lg:gap-y-0">
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <h1
              id="hero-heading"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]"
            >
              {site.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.tagline}
            </p>
          </div>

          <div className="min-w-0 lg:col-start-1 lg:row-start-3">
            <p className="max-w-2xl leading-relaxed lg:mt-4">{site.intro}</p>
            <Contact />
          </div>

          {media ? (
            <figure className="row-start-2 mx-auto shrink-0 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mx-0 lg:self-center">
              <img
                src={media.src}
                alt={media.alt}
                className="size-40 rounded-full border-2 border-accent/35 bg-surface-solid object-cover object-top shadow-md shadow-black/10 sm:size-48 lg:size-60 dark:shadow-black/25"
                loading="eager"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>
      </SectionContainer>
    </section>
  )
}
