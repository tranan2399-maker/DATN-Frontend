// import { LocationSelector } from '../../../components/LocationSelector'
// import { useShowTimeContext } from '../contexts'
import { CategorySelector } from './CategorySelector'

export const ShowTimesHeader = () => {
  // const { handleCurrentLocation } = useShowTimeContext()
  return (
    <section className="showtimes-header container ">
      {/* <LocationSelector handleCurrentLocation={handleCurrentLocation} /> */}
      <CategorySelector cls='mt-32' />
    </section>
  )
}
