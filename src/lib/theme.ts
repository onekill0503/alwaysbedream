import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const META_COLOR: Record<ResolvedTheme, string> = {
  light: '#fbfbfa',
  dark: '#0f0f11',
}

function readStored(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    // Private modes throw on localStorage access; fall back to the OS.
    return 'system'
  }
}

function prefersDark(): boolean {
  return (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') return prefersDark() ? 'dark' : 'light'
  return theme
}

function applyToDocument(resolved: ResolvedTheme): void {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.getElementById('theme-color')?.setAttribute('content', META_COLOR[resolved])
}

let currentTheme: Theme = readStored()
// Snapshot is a primitive so useSyncExternalStore can compare it by value.
let snapshot = `${currentTheme}|${resolveTheme(currentTheme)}`
const listeners = new Set<() => void>()

// The bootstrap in index.html normally has the class on already, so this is a
// no-op. It matters when that script could not read localStorage: this module
// would resolve 'system' -> 'dark' while the document stayed light, and every
// consumer of `resolved` (the contributions iframe, the toggle icon) would
// disagree with what is on screen until the second click. Runs at import,
// before React renders.
applyToDocument(resolveTheme(currentTheme))

function refresh(): void {
  const next = `${currentTheme}|${resolveTheme(currentTheme)}`
  if (next === snapshot) return
  snapshot = next
  for (const listener of listeners) listener()
}

export function setTheme(next: Theme): void {
  try {
    if (next === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Nothing to persist to; the in-memory choice still applies for this visit.
  }
  currentTheme = next
  applyToDocument(resolveTheme(next))
  refresh()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): string {
  return snapshot
}

if (typeof matchMedia === 'function') {
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // Only follow the OS while the visitor has not chosen explicitly.
    if (currentTheme !== 'system') return
    applyToDocument(resolveTheme('system'))
    refresh()
  })
}

export function useTheme() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const [theme, resolved] = value.split('|') as [Theme, ResolvedTheme]
  return { theme, resolved, setTheme }
}
