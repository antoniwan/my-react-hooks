export type HookExample = {
  id: string
  name: string
  description: string
  category: string
}

export const HOOKS: HookExample[] = [
  // State & utilities
  {
    id: 'useCounter',
    name: 'useCounter',
    description: 'Numeric state with increment, decrement, reset, and optional bounds.',
    category: 'State & utilities',
  },
  {
    id: 'useToggle',
    name: 'useToggle',
    description: 'Boolean state with helpers for toggling, turning on, and turning off.',
    category: 'State & utilities',
  },
  {
    id: 'usePrevious',
    name: 'usePrevious',
    description: 'Track the previous value of a prop, state, or derived value.',
    category: 'State & utilities',
  },
  {
    id: 'useLocalStorage',
    name: 'useLocalStorage',
    description: 'Synchronize a piece of state with localStorage using JSON.',
    category: 'State & utilities',
  },

  // Browser & environment
  {
    id: 'useTheme',
    name: 'useTheme',
    description: 'Light/dark theme toggle with persistence and system preference support.',
    category: 'Browser & environment',
  },
  {
    id: 'useScrollDirection',
    name: 'useScrollDirection',
    description: 'Small helper for scroll-aware UI, like showing/hiding a footer.',
    category: 'Browser & environment',
  },
  {
    id: 'useSiteMeta',
    name: 'useSiteMeta',
    description: 'Reads site metadata like version and repo URL from build-time config.',
    category: 'Browser & environment',
  },

  // Context & aggregates
  {
    id: 'useUserContext',
    name: 'useUserContext',
    description:
      'Aggregates geo, weather, language, device, session, and time-of-day signals.',
    category: 'Context & aggregates',
  },
]

