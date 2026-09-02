import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs))
}

/**
 * Read live rather than cached in state: this is checked at the moment an
 * animation is about to start, not tracked across a session.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Scrolls to a section by id. Offset comes from `scroll-margin-top` in
 * index.css, so header height is not duplicated in JS.
 */
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
