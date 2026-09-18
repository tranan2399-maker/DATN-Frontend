import { AnimatedPage } from '../../components/AnimatedPage'
import MoviePageCollection from './components/MoviePageCollection'
import MoviePageHeader from './components/MoviePageHeader'

const MoviePage = () => {
  return (
    <AnimatedPage>
      <>
        <MoviePageHeader />
        <MoviePageCollection />
      </>
    </AnimatedPage>
  )
}

export default MoviePage
