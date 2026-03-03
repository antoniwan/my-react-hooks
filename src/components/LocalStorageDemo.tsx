import type { ChangeEvent } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const DEFAULT_STORAGE_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_DEMO_KEY ?? 'my-react-hooks:message'

export function LocalStorageDemo() {
  const { value, setValue, remove } = useLocalStorage<string>(
    DEFAULT_STORAGE_KEY,
    '',
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useLocalStorage</h2>
        <p className="hook-demo-description">
          State that is kept in sync with <code>localStorage</code>, using a
          configurable key.
        </p>
      </div>

      <p>
        Storage key: <code>{DEFAULT_STORAGE_KEY}</code>
      </p>

      <input
        type="text"
        className="hook-input"
        value={value}
        onChange={handleChange}
        placeholder="Type a message, then reload the page…"
      />

      <div className="counter-demo-actions">
        <button type="button" onClick={remove}>
          Clear stored value
        </button>
      </div>
    </div>
  )
}
