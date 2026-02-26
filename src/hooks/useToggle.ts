import { useState } from 'react'

export type UseToggleOptions = {
  initialValue?: boolean
}

export function useToggle(options: UseToggleOptions = {}) {
  const { initialValue = false } = options
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue((current) => !current)
  }

  const setTrue = () => {
    setValue(true)
  }

  const setFalse = () => {
    setValue(false)
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  }
}

