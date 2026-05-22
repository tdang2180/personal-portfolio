import { useCallback, useEffect, useId, useRef } from 'react'
import type { ProjectImage } from '../content/site'

type ImageLightboxProps = {
  open: boolean
  onClose: () => void
  images: ProjectImage[]
  index: number
  onIndexChange: (index: number) => void
  projectTitle?: string
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
  'flex size-10 shrink-0 items-center justify-center rounded-full border border-border-strong/80 bg-surface-solid text-foreground transition hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40'

export function ImageLightbox({
  open,
  onClose,
  images,
  index,
  onIndexChange,
  projectTitle = 'Project',
}: ImageLightboxProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length
  const hasMultiple = count > 1
  const current = images[index] ?? images[0]
  if (!current) return null

  const alt = current.alt ?? `${projectTitle} screenshot ${index + 1}`

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + count) % count)
    },
    [count, index, onIndexChange],
  )

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowLeft') go(-1)
      if (hasMultiple && e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, go, hasMultiple])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close image preview"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-solid shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border-strong/60 px-4 py-3 sm:gap-4">
          <p id={titleId} className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {alt}
            {hasMultiple ? (
              <span className="ml-2 tabular-nums text-muted">
                ({index + 1}/{count})
              </span>
            ) : null}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={current.src}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-hover hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
            >
              Open in tab
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-hover hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
            >
              Close
            </button>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 items-center justify-center gap-2 bg-black/20 p-3 sm:gap-3 sm:p-4">
          {hasMultiple ? (
            <button
              type="button"
              className={navBtnClass}
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
            >
              <ChevronIcon direction="left" />
            </button>
          ) : null}
          <img
            key={current.src}
            src={current.src}
            alt={alt}
            className="max-h-[min(78vh,800px)] min-w-0 flex-1 object-contain"
            decoding="async"
          />
          {hasMultiple ? (
            <button
              type="button"
              className={navBtnClass}
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
            >
              <ChevronIcon direction="right" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
