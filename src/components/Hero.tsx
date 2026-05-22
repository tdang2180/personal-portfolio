import { site } from '../content/site'
import { Contact } from './Contact'

export function Hero() {
  const media = site.heroMedia

  return (
    <section
      id="top"
      className="border-b border-border-strong/60 pt-12 sm:pb-10 sm:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_auto]">
        <div>
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]"
          >
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{site.tagline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed">{site.intro}</p>
          <Contact />
        </div>

        {media ? (
          <figure className="mx-auto shrink-0 lg:mx-0">
            <img
              src={media.src}
              alt={media.alt}
              className="rounded-full border-2 border-accent/35 bg-surface-solid object-cover object-top shadow-md shadow-black/10 lg:size-60 dark:shadow-black/25"
              loading="eager"
              decoding="async"
            />
          </figure>
        ) : null}
      </div>
    </section>
  )
}
