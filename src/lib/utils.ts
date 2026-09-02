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
 * An explicit `behavior` overrides the `scroll-behavior` declared in CSS, so
 * the reduced-motion rule in index.css cannot reach these calls on its own.
 * Without this the nav buttons would smooth-scroll for a visitor who asked
 * for no motion, while the plain `#work` anchors honoured the CSS — the same
 * page scrolling two different ways depending on which control was used.
 */
function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

/**
 * Scrolls to a section by id. Offset comes from `scroll-margin-top` in
 * index.css, so header height is not duplicated in JS.
 */
export function scrollToId(id: string): void {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: scrollBehavior() })
}
