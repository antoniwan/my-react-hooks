import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down' | 'none'

type Options = {
  threshold?: number
}

export function useScrollDirection(options: Options = {}) {
  const { threshold = 8 } = options

  const [direction, setDirection] = useState<ScrollDirection>('none')
  const [scrollY, setScrollY] = useState(() =>
    typeof window === 'undefined' ? 0 : window.scrollY,
  )
  const lastYRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    lastYRef.current = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastYRef.current

      if (Math.abs(delta) < threshold) return

      setDirection(delta > 0 ? 'down' : 'up')
      setScrollY(currentY)
      lastYRef.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  const atTop = scrollY <= 0
  const atBottom =
    typeof window !== 'undefined' && typeof document !== 'undefined'
      ? Math.ceil(scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight
      : false

  return { direction, scrollY, atTop, atBottom }
}
