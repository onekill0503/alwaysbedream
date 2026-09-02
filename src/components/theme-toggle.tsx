import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '@/lib/theme'

const ORDER: Theme[] = ['light', 'dark', 'system']
const ICONS = { light: Sun, dark: Moon, system: Monitor }
const LABELS: Record<Theme, string> = { light: 'Light', dark: 'Dark', system: 'System' }

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const Icon = ICONS[theme]
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Theme: ${LABELS[theme]}`}
      aria-label={`Theme: ${LABELS[theme]}. Switch to ${LABELS[next]}.`}
      className="grid h-9 w-9 place-items-center rounded-md border border-line text-mut transition-colors hover:border-accent hover:text-accent"
    >
      <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}

export default ThemeToggle
