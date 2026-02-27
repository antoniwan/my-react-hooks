import { useEffect, useRef } from 'react'

export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  // We intentionally read the ref during render to expose the previous value.
  // eslint-disable-next-line react-hooks/refs
  return ref.current
}
