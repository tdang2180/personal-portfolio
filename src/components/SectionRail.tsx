import { useEffect, useRef, useState } from 'react'

type Section = { label: string; href: string }

const SECTIONS: Section[] = [
  { label: 'Me', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
]

const RAIL_LEFT = 'max(0.7rem, calc((50vw - min(50vw, 72rem)) / 2 - 15rem))'
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
  const w = 130
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

/** Fixed left cue: L + label; fades in after scrolling past the hero. */
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
  const showMark = markVisible > 0.02

  return (
    <div className="pointer-events-none fixed inset-0 z-[35] hidden xl:block">
      <nav
        aria-label="Current section"
        aria-hidden={!showMark}
        className="pointer-events-auto absolute top-28 flex max-w-full items-center gap-3.5 text-accent transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform] motion-reduce:transition-none"
        style={{
          left: RAIL_LEFT,
          opacity: markVisible * 0.78,
          transform: `translateY(${(1 - markVisible) * 10}px)`,
          pointerEvents: markVisible > 0.45 ? 'auto' : 'none',
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
  )
}
