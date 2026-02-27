import { useCounter } from '../hooks/useCounter'
import { usePrevious } from '../hooks/usePrevious'

export function PreviousValueDemo() {
  const { value, increment, decrement, reset } = useCounter({
    initialValue: 0,
    step: 1,
  })
  const previous = usePrevious(value)

  return (
    <div className="hook-demo">
      <div className="hook-demo-header">
        <h2>usePrevious</h2>
        <p className="hook-demo-description">
          Keep track of the previous value of a piece of state or a prop.
        </p>
      </div>

      <p>
        Current value: <strong>{value}</strong>
      </p>
      <p>
        Previous value:{' '}
        <strong>
          {typeof previous === 'undefined' ? '— (none yet)' : previous}
        </strong>
      </p>

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
