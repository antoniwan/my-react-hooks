import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const stored = window.localStorage.getItem(key)
      if (stored === null) return initialValue
      return JSON.parse(stored) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore write errors (e.g. quota exceeded, private mode)
    }
  }, [key, value])

  const remove = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
    setValue(initialValue)
  }

  return { value, setValue, remove }
}
