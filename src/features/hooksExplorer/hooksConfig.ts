export type HookExample = {
  id: string
  name: string
  description: string
}

export const HOOKS: HookExample[] = [
  {
    id: 'useCounter',
    name: 'useCounter',
    description: 'Numeric state with increment, decrement, reset, and optional bounds.',
  },
  {
    id: 'useTheme',
    name: 'useTheme',
    description: 'Light/dark theme toggle with persistence and system preference support.',
  },
  {
    id: 'useScrollDirection',
    name: 'useScrollDirection',
    description: 'Small helper for scroll-aware UI, like showing/hiding a footer.',
  },
  {
    id: 'useSiteMeta',
    name: 'useSiteMeta',
    description: 'Reads site metadata like version and repo URL from build-time config.',
  },
]

