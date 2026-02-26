import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { CounterDemo } from './components/CounterDemo'
import { ThemeToggleDemo } from './components/ThemeToggleDemo'
import { useTheme } from './hooks/useTheme'

type HookExample = {
  id: string
  name: string
  description: string
}

const HOOKS: HookExample[] = [
  {
    id: 'useCounter',
    name: 'useCounter',
    description: 'Numeric state with increment, decrement, reset, and optional bounds.',
  },
  {
    id: 'useTheme',
    name: 'useTheme',
    description: 'Light/dark theme toggle with persistence and system preference support.',
  },
]

function App() {
  const [selectedHookId, setSelectedHookId] = useState<string>(HOOKS[0]?.id ?? 'useCounter')
  const { theme, toggleTheme } = useTheme()

  const selectedHook = HOOKS.find((hook) => hook.id === selectedHookId) ?? HOOKS[0]

  return (
    <Layout
      header={
        <div className="header-inner">
          <div>
            <h1>My React Hooks</h1>
            <p className="header-subtitle">Small, focused hooks for learning and experiments.</p>
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
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      }
      sidebar={
        <nav className="hook-list">
          <h2 className="hook-list-title">Hooks</h2>
          <ul>
            {HOOKS.map((hook) => (
              <li key={hook.id}>
                <button
                  type="button"
                  className={
                    hook.id === selectedHookId ? 'hook-list-item is-active' : 'hook-list-item'
                  }
                  onClick={() => setSelectedHookId(hook.id)}
                >
                  <span className="hook-name">{hook.name}</span>
                  <span className="hook-description">{hook.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      }
    >
      {selectedHook?.id === 'useCounter' && <CounterDemo />}
      {selectedHook?.id === 'useTheme' && <ThemeToggleDemo theme={theme} toggleTheme={toggleTheme} />}
    </Layout>
  )
}

export default App
