import { site } from '../content/site'
import { SECTION_WIDTH, SectionContainer } from './SectionContainer'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <SectionContainer width={SECTION_WIDTH.about}>
        <h2
          id="about-heading"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle"
        >
          About
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          {site.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
