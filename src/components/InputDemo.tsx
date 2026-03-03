import { useInput } from '../hooks/useInput'

export function InputDemo() {
  const name = useInput({ initialValue: '' })
  const bio = useInput({ initialValue: '' })

  const handleReset = () => {
    name.reset()
    bio.reset()
  }

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useInput</h2>
        <p className="hook-demo-description">
          Controlled input state with value, onChange, setValue, and reset.
        </p>
      </div>

      <div className="hook-demo-field">
        <label>
          <span className="hook-demo-label">Name</span>
          <input
            type="text"
            className="hook-input"
            value={name.value}
            onChange={name.onChange}
            placeholder="Type your name"
          />
        </label>
      </div>

      <div className="hook-demo-field">
        <label>
          <span className="hook-demo-label">Bio</span>
          <textarea
            className="hook-textarea"
            value={bio.value}
            onChange={bio.onChange}
            placeholder="A short sentence about you"
            rows={3}
          />
        </label>
      </div>

      <div className="counter-demo-actions">
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="hook-demo-summary">
        <p>
          <strong>Preview:</strong>{' '}
          {name.value ? `${name.value} — ${bio.value || 'no bio yet'}` : 'No name yet'}
        </p>
      </div>
    </div>
  )
}

