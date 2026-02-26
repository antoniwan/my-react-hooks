import { useState } from 'react'

export type UseCounterOptions = {
  initialValue?: number
  step?: number
  min?: number
  max?: number
}

export function useCounter(options: UseCounterOptions = {}) {
  const { initialValue = 0, step = 1, min, max } = options
  const [value, setValue] = useState(initialValue)

  const clamp = (next: number) => {
    if (typeof min === 'number' && next < min) return min
    if (typeof max === 'number' && next > max) return max
    return next
  }

  const increment = () => {
    setValue((current) => clamp(current + step))
  }

  const decrement = () => {
    setValue((current) => clamp(current - step))
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    increment,
    decrement,
    reset,
  }
}
