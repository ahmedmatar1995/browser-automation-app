import type { T as Theme } from '@/lib/theme'
import { setThemeServerFn } from '@/lib/theme'
import type { PropsWithChildren } from 'react'
import { createContext, use, useEffect, useState } from 'react'

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void }
type Props = PropsWithChildren<{ theme: Theme }>

const ThemeContext = createContext<ThemeContextVal | null>(null)

function applyTheme(val: Theme) {
  document.documentElement.dataset.theme = val
  document.documentElement.className = val
}

export function ThemeProvider({ children, theme: initialTheme }: Props) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [])

  function setTheme(val: Theme) {
    setThemeState(val)
    applyTheme(val)
    setThemeServerFn({ data: val })
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}

export function useTheme() {
  const val = use(ThemeContext)
  if (!val) throw new Error('useTheme called outside of ThemeProvider!')
  return val
}
