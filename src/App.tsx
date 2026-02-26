import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { CounterDemo } from './components/CounterDemo'
import { ThemeToggleDemo } from './components/ThemeToggleDemo'
import { ScrollDirectionDemo } from './components/ScrollDirectionDemo'
import { SiteFooter } from './components/SiteFooter'
import { useTheme } from './hooks/useTheme'
import { useScrollDirection } from './hooks/useScrollDirection'

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
  {
    id: 'useScrollDirection',
    name: 'useScrollDirection',
    description: 'Small helper for scroll-aware UI, like showing/hiding a footer.',
  },
]

function App() {
  const [selectedHookId, setSelectedHookId] = useState<string>(HOOKS[0]?.id ?? 'useCounter')
  const { theme, toggleTheme } = useTheme()
  const { direction, atTop, atBottom } = useScrollDirection({ threshold: 10 })

  const selectedHook = HOOKS.find((hook) => hook.id === selectedHookId) ?? HOOKS[0]

  const showFooter = atBottom || atTop || direction === 'up'

  const VERSION = 'v0.1.0'
  const REPO_URL = 'https://github.com/your-username/my-react-hooks'

  return (
    <>
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
        {selectedHook?.id === 'useTheme' && (
          <ThemeToggleDemo theme={theme} toggleTheme={toggleTheme} />
        )}
        {selectedHook?.id === 'useScrollDirection' && <ScrollDirectionDemo />}
      </Layout>

      <SiteFooter
        version={VERSION}
        repoUrl={REPO_URL}
        visible={showFooter}
        links={[]}
      />
    </>
  )
}

export default App
