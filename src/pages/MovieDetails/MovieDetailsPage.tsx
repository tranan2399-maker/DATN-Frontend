import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MovieType } from '@/Interface/movie'
import { moviesAction } from '@/store/movie'
import useAllMovie from '@/hooks/useAllMovie'
import { AnimatedPage } from '../../components/AnimatedPage'
import { MovieInfoSection } from './components/MovieInfoSection'
import { MovieInfoCollection } from './components/MovieInfoCollection'
import Comment from '@/components/Comment/Comment'

import '@/components/Comment/comment.css'
import './stitchMovieDetails.css'

const MovieDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams<{ slug: string }>()
  const movies = useSelector((state: any) => state.movies.movies)

  // In case user refreshed or directly visited by URL
  const { data: allMoviesData, isLoading: isAllMoviesLoading } = useAllMovie()

  useEffect(() => {
    if (allMoviesData && (!movies || movies.length === 0)) {
      dispatch(moviesAction.fetchData(allMoviesData))
    }
  }, [allMoviesData, movies, dispatch])

  // While movies are loading from API
  if (isAllMoviesLoading && (!movies || movies.length === 0)) {
    return (
      <div className="stitch-movie-details-scope min-h-[80vh] pt-[70px] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#E50914] border-t-transparent animate-spin"></div>
        <p className="text-sm font-semibold text-[#A8A8B3] tracking-wide">
          Đang khởi tạo phòng vé Dream Cinema...
        </p>
      </div>
    )
  }

  const currentMovie =
    movies && movies.length > 0
      ? movies.find((movie: MovieType) => movie.slug === slug)
      : null

  // If loading finished and movie definitely does not exist
  if (!isAllMoviesLoading && movies && movies.length > 0 && !currentMovie) {
    navigate('/')
    return null
  }

  return (
    <AnimatedPage>
      <div className="stitch-movie-details-scope pt-[70px] pb-16">
        {/* Main Stitch Booking Flow */}
        <MovieInfoSection />

        {/* Related Movies Collection & Discussions */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-6 space-y-12">
          <div className="border-t border-white/[0.08] pt-10">
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#E50914]"></span>
              Phim cùng thể loại đề xuất
            </h3>
            <MovieInfoCollection />
          </div>

          <div className="border-t border-white/[0.08] pt-10">
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#F5B301]"></span>
              Đánh giá & Bình luận từ khán giả
            </h3>
            <div className="bg-[#14141A] rounded-2xl p-4 sm:p-6 border border-white/[0.08] shadow-xl">
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default MovieDetailsPage
