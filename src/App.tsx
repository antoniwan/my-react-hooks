import { useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { CounterDemo } from './components/CounterDemo'

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
]

function App() {
  const [selectedHookId, setSelectedHookId] = useState<string>(HOOKS[0]?.id ?? 'useCounter')

  const selectedHook = HOOKS.find((hook) => hook.id === selectedHookId) ?? HOOKS[0]

  return (
    <Layout
      header={
        <div className="header-inner">
          <div>
            <h1>My React Hooks</h1>
            <p className="header-subtitle">Small, focused hooks for learning and experiments.</p>
          </div>
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
    </Layout>
  )
}

export default App
