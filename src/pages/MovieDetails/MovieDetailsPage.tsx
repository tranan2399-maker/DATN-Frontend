// import { Navbar } from '../../components/Navbar'
import { MovieInfoSection } from './components/MovieInfoSection'
import { MovieInfoCollection } from './components/MovieInfoCollection'
// import { Footer } from '../../components/Footer'
import { AnimatedPage } from '../../components/AnimatedPage'
import Comment from '@/components/Comment/Comment'

import '@/components/Comment/comment.css'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieType } from '@/Interface/movie'

const MovieDetailsPage = () => {
  const navigate = useNavigate()
  const movies = useSelector((state: any) => state.movies.movies)
  const { slug } = useParams()
  const currentMovie =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  if (!currentMovie) {
    navigate('/')
    return
  }
  return (
    <AnimatedPage>
      <>
        <MovieInfoSection />
        <MovieInfoCollection />
        <div className="App">
          <Comment />
        </div>
      </>
    </AnimatedPage>
  )
}

export default MovieDetailsPage
