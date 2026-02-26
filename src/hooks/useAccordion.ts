import { useCallback, useState } from 'react'

export function useAccordion<T extends string | number>(
  items: readonly T[],
  options?: { initialItem?: T | null },
) {
  const computedInitial =
    typeof options?.initialItem !== 'undefined' ? options.initialItem : items[0] ?? null

  const [openItem, setOpenItem] = useState<T | null>(computedInitial)

  const isOpen = useCallback(
    (id: T) => openItem === id,
    [openItem],
  )

  const toggle = useCallback((id: T) => {
    setOpenItem((current) => (current === id ? current : id))
  }, [])

  return { openItem, isOpen, toggle }
}

