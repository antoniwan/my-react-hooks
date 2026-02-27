import { useToggle } from '../hooks/useToggle'

export function ToggleDemo() {
  const { value, toggle, setTrue, setFalse } = useToggle({
    initialValue: false,
  })

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useToggle</h2>
        <p className="hook-demo-description">
          Simple boolean state with helpers for toggling, forcing on, and
          forcing off.
        </p>
      </div>

      <p>
        Current value: <strong>{value ? 'true' : 'false'}</strong>
      </p>

      <div className="counter-demo-actions">
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
        <button type="button" onClick={setFalse}>
          Set false
        </button>
      </div>
    </div>
  )
}
