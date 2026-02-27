import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  type InternalState,
  type UserContext,
  type UserContextOptions,
  useUserContextInternal,
} from './internal'

export type UserContextProviderProps = {
  children: ReactNode
  options?: UserContextOptions
  initialValue?: Partial<UserContext>
}

export const UserContextReact = createContext<InternalState | null>(null)

export function UserContextProvider({
  children,
  options,
  initialValue,
}: UserContextProviderProps) {
  const internal = useUserContextInternal(options)

  const value = useMemo<InternalState>(() => {
    if (!initialValue) return internal

    return {
      ...internal,
      ...initialValue,
    }
  }, [internal, initialValue])

  return (
    <UserContextReact.Provider value={value}>
      {children}
    </UserContextReact.Provider>
  )
}

export function useUserContext(options?: UserContextOptions): UserContext {
  const contextValue = useContext(UserContextReact)

  if (contextValue) {
    return contextValue
  }

  return useUserContextInternal(options)
}
