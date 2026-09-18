import { CollectionCard } from '../../../components/CollectionCard'
import { useQuery } from '@tanstack/react-query'
import { getRelateMovie } from '@/api/movie'
import { useNavigate, useParams } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './slider.css'
import 'swiper/css/free-mode'
import Carousel from '@/components/CardCarousel/CardCarousel'
import HashLoader from 'react-spinners/HashLoader'
import { MovieType } from '@/Interface/movie'
import SwiperSlider from '@/components/SwiperSlide/SwiperSlider'
import { useSelector } from 'react-redux'
// import axios from 'axios'
// import HashLoader from 'react-spinners/HashLoader'
// import { useParams } from 'react-router-dom'

export const MovieInfoCollection = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const navigate = useNavigate()
  const { slug } = useParams()
  const { _id = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  const {
    data: dataMovie,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['MOVIE_RELATED', _id],
    queryFn: () => getRelateMovie(_id)
  })
  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  if (isError) {
    navigate('/')
    return
  }

  return (
    <section className="section-movie-info-collection bg-background-secondary">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary border-b-4 border-primary-movieColor ">
          Tìm phim khác &rarr;
        </h1>
      </div>

      <div className="details-collection-container after:opacity-0 dark:after:opacity-100 xs:hidden sm:grid">
        <SwiperSlider dataMovie={dataMovie} slidePerView={5}>
          {dataMovie?.map((movie: MovieType, index: number) => {
            return (
              <SwiperSlide key={index}>
                <CollectionCard
                  movie={movie}
                  className="md:w-[26rem] sm:w-[28rem] xs:w-[28rem] "
                />
              </SwiperSlide>
            )
          })}
        </SwiperSlider>
      </div>
      <div className="details-collection-container2 after:opacity-0 dark:after:opacity-100 xs:grid sm:hidden">
        {/* ------------------------------------------------------------------------- */}
        <Carousel className="">
          {dataMovie?.map((movie: MovieType, i: number) => (
            <CollectionCard
              key={i}
              movie={movie}
              className="md:w-[26rem] sm:w-[28rem] xs:w-[26rem]"
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
}
