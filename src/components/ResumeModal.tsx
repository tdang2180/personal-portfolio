import { useEffect, useId, useRef } from 'react'

type ResumeModalProps = {
  open: boolean
  onClose: () => void
  src: string
  title?: string
}

export function ResumeModal({ open, onClose, src, title = 'Resume' }: ResumeModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close resume preview"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-solid shadow-2xl shadow-black/25 dark:shadow-black/50"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border-strong/60 px-4 py-3 sm:px-5">
          <h2 id={titleId} className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={src}
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
        <iframe src={src} title={title} className="min-h-[70vh] w-full flex-1 bg-white sm:min-h-0" />
      </div>
    </div>
  )
}
