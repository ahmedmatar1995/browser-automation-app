import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
    >
      {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
