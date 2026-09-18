import { MovieType } from '@/Interface/movie'
import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetailMovieItem from './DetailMovieItem'

function DetailMovie() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const { slug } = useParams()
  const { _id = '', name = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={name}
        pageLink="/admin/movie"
        pageRetun={`Phim / ${name}`}
      />
      <DetailMovieItem id={_id} />
    </DefaultLayout>
  )
}

export default DetailMovie
