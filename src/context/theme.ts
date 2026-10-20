import { createSignal } from 'solid-js'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'envoytrade_theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

const [theme, setTheme] = createSignal<Theme>(getInitialTheme())

export function useTheme() {
  const isDark = () => theme() === 'dark'

  const toggleTheme = () => {
    const next: Theme = theme() === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.dataset.theme = next
    }
  }

  return {
    theme,
    isDark,
    toggleTheme,
  }
}
