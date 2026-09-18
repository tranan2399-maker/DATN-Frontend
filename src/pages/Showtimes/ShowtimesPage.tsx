import { useState } from 'react'
import { AnimatedPage } from '../../components/AnimatedPage'
import { ShowTimesCollection } from './components/ShowTimesCollection'
import { ShowTimesHeader } from './components/ShowTimesHeader'
import { ShowtimeContextProvider } from './contexts'

const ShowtimesPage = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [filterMovieByCategory, setFilterMovieByCategory] = useState<string>(
    ''
  )

  const handleCurrentLocation = (locationId: string) => {
    setCurrentLocation(locationId)
  }

  const handleFilterMovieByCategory = (filterMovie: string) => {
    setFilterMovieByCategory(filterMovie)
  }

  return (
    <AnimatedPage>
      <ShowtimeContextProvider
        value={{
          currentLocation,
          handleCurrentLocation,
          filterMovieByCategory,
          handleFilterMovieByCategory
        }}
      >
        <ShowTimesHeader />
        <ShowTimesCollection />
      </ShowtimeContextProvider>
    </AnimatedPage>
  )
}

export default ShowtimesPage
