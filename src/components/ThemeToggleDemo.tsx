import type { Theme } from '../hooks/useTheme'

type ThemeToggleDemoProps = {
  theme: Theme
  toggleTheme: () => void
}

export function ThemeToggleDemo({ theme, toggleTheme }: ThemeToggleDemoProps) {
  const label =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useTheme</h2>
        <p className="hook-demo-description">
          Light/dark theme state stored in localStorage and synced with the
          document.
        </p>
      </div>

      <p>Current theme: {theme}</p>

      <div className="counter-demo-actions">
        <button type="button" onClick={toggleTheme} aria-label={label}>
          {theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
        </button>
      </div>
    </div>
  )
}
