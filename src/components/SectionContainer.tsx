import type { ReactNode } from 'react'

/**
 * Per-section content width. Change these to control how tight or spread each block is.
 *
 * narrow  → max-w-3xl  (~768px)  good for reading-heavy sections
 * medium  → max-w-5xl  (~1024px) balanced default
 * wide    → max-w-7xl  (~1280px) roomier but still centered
 * full    → no max-width — uses full viewport (minus Layout padding)
 */
export const SECTION_WIDTH = {
  hero: 'medium',
  projects: 'full',
  experience: 'medium',
  about: 'medium',
  header: 'medium',
  footer: 'medium',
} as const satisfies Record<string, SectionWidthKey>

export type SectionWidthKey = 'narrow' | 'medium' | 'wide' | 'full'

const WIDTH_CLASS: Record<SectionWidthKey, string> = {
  narrow: 'mx-auto w-full max-w-3xl',
  medium: 'mx-auto w-full max-w-5xl',
  wide: 'mx-auto w-full max-w-7xl',
  full: 'w-full max-w-none',
}

type SectionContainerProps = {
  width: SectionWidthKey
  children: ReactNode
  className?: string
}

export function SectionContainer({ width, children, className = '' }: SectionContainerProps) {
  return <div className={`min-w-0 ${WIDTH_CLASS[width]} ${className}`.trim()}>{children}</div>
}
