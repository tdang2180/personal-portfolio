import { site } from '../content/site'
import { Contact } from './Contact'

export function Hero() {
  const media = site.heroMedia

  return (
    <section
      id="top"
      className="scroll-mt-24 border-b border-border-strong/60 pb-16 pt-12 sm:pb-20 sm:pt-16"
      aria-labelledby="hero-heading"
    >
        <div>
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.1]"
          >
             {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{site.tagline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed">{site.intro}</p>
          <Contact />
        </div>

        {media ? (
          <div className="flex justify-center lg:justify-end">
            <figure className="w-full max-w-[280px]">
              <img
                src={media.src}
                alt={media.alt}
                width={560}
                height={700}
                className="aspect-[4/5] w-full rounded-2xl border border-card-border bg-surface-solid object-cover shadow-md shadow-black/10 dark:shadow-black/25"
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>
        ) : null}
    </section>
  )
}
