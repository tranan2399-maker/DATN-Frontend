import { createContext, useContext } from 'react'

type ShowtimeContextType = {
  currentLocation: string
  handleCurrentLocation: (locationId: string) => void
  filterMovieByCategory: string
  handleFilterMovieByCategory: (filterMovie: string) => void
}

const ShowtimeContext = createContext<ShowtimeContextType>(
  {} as ShowtimeContextType
)

ShowtimeContext.displayName = 'ShowtimeContext'

export const ShowtimeContextProvider = ShowtimeContext.Provider

export const useShowTimeContext = () => useContext(ShowtimeContext)
