import { useState, type ChangeEvent } from 'react'

export type UseInputOptions = {
  initialValue?: string
}

export function useInput(options: UseInputOptions = {}) {
  const { initialValue = '' } = options
  const [value, setValue] = useState(initialValue)

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    onChange,
    setValue,
    reset,
  }
}

