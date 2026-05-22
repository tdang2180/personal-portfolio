import { useCallback, useEffect, useRef, useState } from 'react'

type Pose = {
  x: number
  y: number
  rot: number
  opacity: number
}

const START_POSE: Pose = { x: 0, y: 0, rot: -6, opacity: 0.92 }

function viewportHeight(): number {
  return window.visualViewport?.height ?? window.innerHeight
}

function firstFallDy(): number {
  return Math.max(Math.round(viewportHeight() - 152), 380)
}

const LAND_X = 18
const LAND_ROT = 16

function landingPose(): Pose {
  return { x: LAND_X, y: firstFallDy(), rot: LAND_ROT, opacity: 1 }
}

function applyPose(el: HTMLElement, p: Pose) {
  el.style.opacity = String(p.opacity)
  el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`
}

const FALL_DURATION_MS = 13_500

/**
 * Decorative leaf: falls once on load to the bottom of the viewport (screen).
 * Replay: click the leaf after it has landed — it resets to the start and falls to the viewport bottom again.
 */
export function FallingLeaf() {
  const leafRef = useRef<HTMLButtonElement | null>(null)
  const poseRef = useRef<Pose>(START_POSE)
  const animRef = useRef<Animation | null>(null)
  const playingRef = useRef(false)
  /** Mirrors playingRef so the leaf can’t receive clicks/disabled polish while falling. */
  const [leafFalling, setLeafFalling] = useState(true)
  /** Set in effect — click handler invokes replay safely. */
  const replayFallRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setLeafFalling(false)
      return
    }

    let dead = false

    function runFall(durationMs = FALL_DURATION_MS): void {
      const el = leafRef.current
      if (!el || dead) {
        playingRef.current = false
        setLeafFalling(false)
        return
      }

      const from = poseRef.current
      const to = landingPose()
      playingRef.current = true
      setLeafFalling(true)
      animRef.current?.cancel()

      const anim = el.animate(
        [
          {
            transform: `translate3d(${from.x}px, ${from.y}px, 0) rotate(${from.rot}deg)`,
            opacity: from.opacity,
          },
          {
            transform: `translate3d(${to.x}px, ${to.y}px, 0) rotate(${to.rot}deg)`,
            opacity: to.opacity,
          },
        ],
        {
          duration: durationMs,
          easing: 'cubic-bezier(0.38, 0, 0.55, 1)',
          fill: 'forwards',
        },
      )
      animRef.current = anim

      let completed = false
      let failSafe: ReturnType<typeof setTimeout> | undefined

      const finalize = () => {
        if (dead || completed) return
        if (animRef.current !== anim) return
        completed = true
        if (failSafe !== undefined) clearTimeout(failSafe)
        poseRef.current = to
        applyPose(el, to)
        playingRef.current = false
        animRef.current = null
        setLeafFalling(false)
      }

      anim.addEventListener('finish', finalize)
      void anim.finished.then(finalize).catch(() => {
        /* cancel / supersede */
      })

      failSafe = window.setTimeout(() => {
        if (!dead && animRef.current === anim) finalize()
      }, durationMs + 400)
    }

    function kickInitial(attempt = 0) {
      const el = leafRef.current
      if (!el || dead) {
        /* Ref can lag first paint — retry briefly so we don’t stay disabled forever */
        if (attempt < 12 && !dead) {
          requestAnimationFrame(() => kickInitial(attempt + 1))
        } else if (!dead) {
          playingRef.current = false
          setLeafFalling(false)
        }
        return
      }
      poseRef.current = START_POSE
      applyPose(el, START_POSE)
      runFall(FALL_DURATION_MS)
    }

    function replayFromStart() {
      if (dead || playingRef.current) return
      const el = leafRef.current
      if (!el) return
      animRef.current?.cancel()
      animRef.current = null
      playingRef.current = false
      poseRef.current = START_POSE
      applyPose(el, START_POSE)
      runFall(FALL_DURATION_MS)
    }

    replayFallRef.current = replayFromStart

    requestAnimationFrame(() => kickInitial(0))

    function onResize() {
      const el = leafRef.current
      if (!el || dead || playingRef.current) return
      poseRef.current = landingPose()
      applyPose(el, poseRef.current)
    }

    window.visualViewport?.addEventListener('resize', onResize)

    return () => {
      dead = true
      playingRef.current = false
      setLeafFalling(false)
      replayFallRef.current = null
      animRef.current?.cancel()
      animRef.current = null
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [])

  const handleLeafActivate = useCallback(() => {
    replayFallRef.current?.()
  }, [])

  return (
    <div
      className="falling-leaf-skip pointer-events-none fixed top-[5.75rem] z-40 hidden lg:block"
      style={{ right: '10rem' }}
    >
      <button
        type="button"
        ref={leafRef}
        disabled={leafFalling}
        tabIndex={leafFalling ? -1 : 0}
        aria-busy={leafFalling}
        onClick={handleLeafActivate}
        onKeyDown={(e) => {
          if (leafFalling) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleLeafActivate()
          }
        }}
        className="pointer-events-auto rounded-lg border border-transparent bg-transparent p-1 text-emerald-700/95 outline-none ring-offset-2 ring-offset-background transition-colors will-change-transform focus-visible:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent dark:text-emerald-400/90 disabled:pointer-events-none disabled:opacity-55 enabled:cursor-pointer enabled:hover:text-emerald-600 dark:enabled:hover:text-emerald-300/95"
        aria-label="Replay falling leaf animation"
        title={
          leafFalling
            ? 'Wait for the leaf to finish falling to the bottom of the screen.'
            : 'Click to replay: the leaf returns to the top and falls to the bottom of the screen.'
        }
      >
        <LeafGlyph className="pointer-events-none h-[4.75rem] w-[3.75rem]" aria-hidden />
      </button>
    </div>
  )
}

function LeafGlyph({ className }: { className?: string }) {
  const vein = 'text-emerald-900/45 dark:text-emerald-200/50'
  const bladeEdge = 'text-emerald-800 dark:text-emerald-300'

  return (
    <svg className={className} viewBox="0 0 52 84" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        className={bladeEdge}
        fill="currentColor"
        fillOpacity={0.22}
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinejoin="round"
        d="M26 5C18 9 9 22 8.5 38.5c-.5 12 4.5 22.5 14 28.5 1.5.9 3 1.6 3.5 1.8C24 70 25 72.5 26 74.5c1-2 2-4.5 3.5-6.2 1-.3 2-1 3.5-1.8 9.5-6 14.5-16.5 14-28.5C43 22 34 9 26 5Z"
      />
      <path
        className={bladeEdge}
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeOpacity={0.95}
        d="M26 9v61"
      />
      <path
        className={vein}
        stroke="currentColor"
        strokeWidth={0.75}
        strokeLinecap="round"
        d="m26 16-8 7M26 25l-10.5 9M26 35l-12 11M26 45.5 13 53M26 55.5 15 60M26 64 18.5 67.5"
      />
      <path
        className={vein}
        stroke="currentColor"
        strokeWidth={0.75}
        strokeLinecap="round"
        d="m26 16 8 7M26 25 36.5 34M26 35l12 11M26 45.5 39 53M26 55.5 37 60M26 64 33.5 67.5"
      />
      <path
        className={vein}
        stroke="currentColor"
        strokeWidth={0.45}
        strokeLinecap="round"
        strokeOpacity={0.75}
        d="m18 26-4 4m-2.5 12-4 3m31-19 4 4m2.5 12 4 3M19.5 50l-5 4m29-9 5 4"
      />
      <path
        className={bladeEdge}
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeOpacity={0.9}
        d="M26 74.5V80"
      />
    </svg>
  )
}
