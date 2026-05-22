import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site'

type Section = { label: string; href: string }

const SECTIONS: Section[] = [
  { label: 'Me', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
]

const RAIL_LEFT = 'max(0.5rem, calc((100vw - min(100vw, 48rem)) / 2 - 21.25rem))'
const SCROLL_FADE_PX = 120

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  return x * x * (3 - 2 * x)
}

function sectionDocTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY
}

function resolveActiveSection(scout: number): string {
  const docHeight = document.documentElement.scrollHeight
  const vh = window.innerHeight
  const atBottom = window.scrollY + vh >= docHeight - 32

  if (atBottom) {
    return SECTIONS[SECTIONS.length - 1]!.href.slice(1)
  }

  for (let i = 0; i < SECTIONS.length; i++) {
    const id = SECTIONS[i]!.href.slice(1)
    const el = document.getElementById(id)
    if (!el) continue

    const top = sectionDocTop(el) - 52
    const nextId = SECTIONS[i + 1]?.href.slice(1)
    const nextEl = nextId ? document.getElementById(nextId) : null
    const bottom = nextEl ? sectionDocTop(nextEl) - 52 : docHeight

    if (scout >= top && scout < bottom) {
      return id
    }
  }

  return SECTIONS[0]!.href.slice(1)
}

function SectionMark({ className = '' }: { className?: string }) {
  const w = 180
  const h = 56
  const stemX = 18
  const topY = 10
  const elbowY = 40
  const armEnd = 208
  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d={`M ${stemX} ${topY} L ${stemX} ${elbowY - 6} Q ${stemX} ${elbowY} ${stemX + 6} ${elbowY} L ${armEnd} ${elbowY}`}
        className="stroke-current"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Fixed left cue: avatar at top; L + label crossfade in on scroll. */
export function SectionRail() {
  const [active, setActive] = useState(() => SECTIONS[0]!.href.slice(1))
  const [markVisible, setMarkVisible] = useState(0)
  const scheduleRafRef = useRef(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sync = () => {
      scheduleRafRef.current = 0

      const vh = window.innerHeight
      const sy = window.scrollY
      const scout = sy + Math.min(140, vh * 0.22)

      const nextActive = resolveActiveSection(scout)
      setActive((prev) => (prev === nextActive ? prev : nextActive))

      const fade = reducedMotionRef.current
        ? sy > SCROLL_FADE_PX * 0.5
          ? 1
          : 0
        : smoothstep(sy / SCROLL_FADE_PX)
      setMarkVisible((prev) => (Math.abs(prev - fade) < 0.004 ? prev : fade))
    }

    const schedule = () => {
      if (scheduleRafRef.current) return
      scheduleRafRef.current = requestAnimationFrame(sync)
    }

    sync()
    const t = window.setTimeout(sync, 120)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      if (scheduleRafRef.current) cancelAnimationFrame(scheduleRafRef.current)
    }
  }, [])

  const activeItem = SECTIONS.find((item) => item.href.slice(1) === active) ?? SECTIONS[0]!
  const hasAvatar = Boolean(site.railAvatar)
  const fade = hasAvatar ? markVisible : 1
  const avatarOpacity = hasAvatar ? 1 - markVisible : 0
  const showMark = fade > 0.02

  return (
    <div className="pointer-events-none fixed inset-0 z-[35] hidden xl:block">
      <div className="fixed top-28 w-[15rem]" style={{ left: RAIL_LEFT }}>
        {site.railAvatar ? (
          <img
            src={site.railAvatar.src}
            alt={site.railAvatar.alt}
            width={240}
            height={240}
            className="-ml-1 size-60 rounded-full border-2 border-accent/35 bg-surface-solid object-cover object-top shadow-sm shadow-black/10 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform] motion-reduce:transition-none dark:shadow-black/30"
            style={{
              opacity: avatarOpacity,
              transform: `scale(${0.94 + avatarOpacity * 0.06})`,
              pointerEvents: avatarOpacity > 0.5 ? 'auto' : 'none',
            }}
            decoding="async"
          />
        ) : null}

        <nav
          aria-label="Current section"
          aria-hidden={!showMark}
          className="absolute left-0 top-0 flex w-full max-w-full items-center gap-3.5 text-accent transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform] motion-reduce:transition-none"
          style={{
            opacity: fade * 0.78,
            transform: `translateY(${(1 - fade) * 10}px)`,
            pointerEvents: fade > 0.45 ? 'auto' : 'none',
          }}
        >
          <p id="section-rail-status" className="sr-only" aria-live="polite">
            Now viewing section: {activeItem.label}
          </p>
          <SectionMark className="shrink-0" />
          <a
            href={activeItem.href}
            tabIndex={showMark ? undefined : -1}
            className="min-w-0 text-sm font-medium tracking-tight text-accent underline-offset-[3px] transition-colors hover:text-accent-hover hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {activeItem.label}
          </a>
        </nav>
      </div>
    </div>
  )
}
