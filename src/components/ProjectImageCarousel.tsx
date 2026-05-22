import { useCallback, useId } from 'react'
import type { ProjectImage } from '../content/site'

type ProjectImageCarouselProps = {
  images: ProjectImage[]
  projectTitle: string
  index: number
  onIndexChange: (index: number) => void
  onZoom: (index: number) => void
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
      )}
    </svg>
  )
}

const navBtnClass =
  'absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong/80 bg-header-bg/90 text-foreground shadow-md backdrop-blur-sm transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40'

export function ProjectImageCarousel({
  images,
  projectTitle,
  index,
  onIndexChange,
  onZoom,
}: ProjectImageCarouselProps) {
  const labelId = useId()
  const count = images.length
  const hasMultiple = count > 1
  const safeIndex = count > 0 ? Math.min(index, count - 1) : 0

  const go = useCallback(
    (delta: number) => {
      onIndexChange((safeIndex + delta + count) % count)
    },
    [count, onIndexChange, safeIndex],
  )

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-card-border bg-surface-solid"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        {projectTitle} screenshots, slide {safeIndex + 1} of {count}
      </p>

      <div
        className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${safeIndex * 100}%)` }}
      >
        {images.map((image, i) => {
          const alt = image.alt ?? `${projectTitle} screenshot ${i + 1}`
          return (
            <div key={`${image.src}-${i}`} className="w-full shrink-0">
              <button
                type="button"
                onClick={() => onZoom(i)}
                className="group block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <img
                  src={image.src}
                  alt={alt}
                  width={1200}
                  height={675}
                  className="aspect-video w-full object-cover transition duration-200 group-hover:brightness-[1.03]"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="sr-only">View larger: {alt}</span>
              </button>
            </div>
          )
        })}
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            className={`${navBtnClass} left-2 sm:left-3`}
            aria-label="Previous screenshot"
            onClick={() => go(-1)}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            className={`${navBtnClass} right-2 sm:right-3`}
            aria-label="Next screenshot"
            onClick={() => go(1)}
          >
            <ChevronIcon direction="right" />
          </button>
          <p
            className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-header-bg/85 px-2 py-0.5 text-xs font-medium tabular-nums text-foreground backdrop-blur-sm"
            aria-hidden
          >
            {safeIndex + 1} / {count}
          </p>
        </>
      ) : null}
    </div>
  )
}
