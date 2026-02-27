import type { Theme } from '../hooks/useTheme'

type AppPage = 'hooks' | 'principles' | 'roadmap'

type AppHeaderProps = {
  theme: Theme
  toggleTheme: () => void
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function AppHeader({ theme, toggleTheme, activePage, onNavigate }: AppHeaderProps) {
  return (
    <div className="header-inner">
      <div>
        <h1>My React Hooks</h1>
        <p className="header-subtitle">
          Small, focused hooks for learning and experiments.
        </p>
        <nav className="header-nav" aria-label="Primary">
          <button
            type="button"
            className={activePage === 'hooks' ? 'header-nav-item is-active' : 'header-nav-item'}
            onClick={() => onNavigate('hooks')}
            aria-current={activePage === 'hooks' ? 'page' : undefined}
          >
            Hooks explorer
          </button>
          <button
            type="button"
            className={
              activePage === 'principles' ? 'header-nav-item is-active' : 'header-nav-item'
            }
            onClick={() => onNavigate('principles')}
            aria-current={activePage === 'principles' ? 'page' : undefined}
          >
            Principles
          </button>
          <button
            type="button"
            className={activePage === 'roadmap' ? 'header-nav-item is-active' : 'header-nav-item'}
            onClick={() => onNavigate('roadmap')}
            aria-current={activePage === 'roadmap' ? 'page' : undefined}
          >
            Hooks roadmap
          </button>
        </nav>
      </div>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {theme === 'dark' ? '☾' : '☼'}
        </span>
        <span className="theme-toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>
    </div>
  )
}

