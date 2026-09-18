import SwiperSlider from '@/components/SwiperSlide/SwiperSlider'

import { SwiperSlide } from 'swiper/react'
import { CollectionCard } from '@/components/CollectionCard'
import { MovieType } from '@/Interface/movie'
import { motion } from 'framer-motion'
import HashLoader from 'react-spinners/HashLoader'
interface MovieRenderType{
    isLoading: boolean
    query: {
        order: string
    }
    currentMovies : MovieType[]
}

function MovieRender({ isLoading, query, currentMovies }: MovieRenderType) {
  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  const item = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1
      },
      x: 0
    }),
    hidden: { x: -100 }
  }
  const list = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4
      }
    },
    hidden: {
      opacity: 0
    }
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={list}
      key={query.order}
      className="details-collection-container after:opacity-0 dark:after:opacity-100 overflow-hidden rounded-3xl"
    >
      {currentMovies && currentMovies.length > 0 ? (
        <SwiperSlider
          dataMovie={currentMovies}
          slidePerView={currentMovies.length > 4 ? 4 : currentMovies.length}
        >
          {currentMovies?.map((movie: MovieType, index: number) => {
            return (
              <SwiperSlide key={index}>
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ x: index * 100, opacity: 0 }}
                  animate="visible"
                  variants={item}
                >
                  <CollectionCard
                    movie={movie}
                    className="md:w-[30rem] sm:w-[28rem] xs:w-[28rem]"
                  />
                </motion.div>
              </SwiperSlide>
            )
          })}
        </SwiperSlider>
      ) : (
        <div className="h-96 flex items-center text-3xl text-primary-movieColor font-bold">
         Không tìm thấy
        </div>
      )}
    </motion.div>
  )
}

export default MovieRender
