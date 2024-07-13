import type React from 'react'
import { useParams } from 'react-router-dom'
import { createContext } from 'use-context-selector'

interface TripContextProviderProps {
  children: React.ReactNode
}

interface TripContextData {
  tripId?: string
}

export const TripContext = createContext<TripContextData>({
  tripId: undefined,
})

export function TripContextProvider({ children }: TripContextProviderProps) {
  const { tripId } = useParams()

  return (
    <TripContext.Provider value={{ tripId }}>{children}</TripContext.Provider>
  )
}
