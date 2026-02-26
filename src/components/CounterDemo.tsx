import { useCounter } from '../hooks/useCounter'

export function CounterDemo() {
  const { value, increment, decrement, reset } = useCounter({ initialValue: 0, step: 1 })

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>useCounter</h2>
        <p className="hook-demo-description">
          Basic numeric state with increment, decrement, reset, and optional min/max.
        </p>
      </div>

      <div className="counter-demo-value">{value}</div>

      <div className="counter-demo-actions">
        <button type="button" onClick={decrement}>
          -1
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={increment}>
          +1
        </button>
      </div>
    </div>
  )
}

