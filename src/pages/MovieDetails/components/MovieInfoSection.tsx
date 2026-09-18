import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneMovie } from '@/api/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import iconMovieDetail from './Icon'
import { useContext } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TicketType, ticketAction } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'

import { useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { chuyenDoiNgay, getDay } from '@/utils'
import { MOVIE_DETAIL, WATCHLIST } from '@/utils/constant'
import { useSelector } from 'react-redux'
import { MovieType } from '@/Interface/movie'
import { Plus, Loader } from 'lucide-react'
import { addWatchList } from '@/api/watchList'
import { ContextMain } from '@/context/Context'
import { toast } from 'react-toastify'
import useWatchList from '@/hooks/useWatchList'
import MovieShowtimeSection from './MovieShowtimeSection'

export interface ShowTimeType {
  screenRoomId: string
  _id: string
  timeFrom: string
  timeTo: string
  date: string
}
export interface ShowTime {
  _id: string
  screenRoomId: {
    _id: string
    name: string
  }
  cinemaId: {
    _id: string
    CinemaName: string
    CinemaAdress: string
  }
  status: string
  timeFrom: string
  timeTo: string
  date: string
}

export const MovieInfoSection = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { userDetail } = useContext(ContextMain)
  const { data: dataWatchList } = useWatchList(userDetail)
  const watchListId = dataWatchList
    ? dataWatchList.map(
        (watchId: { movieId: { _id: string } }) => watchId?.movieId?._id
      )
    : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.movies.movies)
  const [, setTicket] = useLocalStorage<TicketType | null>('ticket', null)

  const navigate = useNavigate()
  const { slug } = useParams()

  const { _id = '' } =
    movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)
  const { mutate: mutateWatchlist, isPending } = useMutation({
    mutationFn: (data: { userId: string; movieId: string }) =>
      addWatchList(data),
    onSuccess: () => {
      toast.success('success', {
        position: 'top-right'
      })
      queryClient.invalidateQueries({
        queryKey: [WATCHLIST]
      })
    }
  })
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, _id],
    queryFn: () => getOneMovie(_id)
  })

  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }

  const {
    _id: movieId,
    name,
    image,
    rate,
    author,
    actor,
    language,
    duration,
    categoryCol,
    fromDate,
    desc,
    trailer,
    // showTimeCol,
    moviePriceCol,
    showTimeDimension
  } = dataMovie

  const handleChooseShowtime = (showtime: ShowTimeType) => {
    if (userDetail && userDetail.message.isBlocked) {
      toast.error('Bạn đã bị block do vi phạm quy định', {
        position: 'top-right'
      })
      return
    }
    const screenRoom = dataMovie.showTimeCol.find(
      (screen: { screenRoomId: { _id: string } }) => {
        return screen.screenRoomId._id == showtime.screenRoomId
      }
    )

    const ticketObject = {
      id_showtime: {
        _id: showtime._id,
        timeFrom: showtime.timeFrom,
        timeTo: showtime.timeTo
      },
      cinema_name: screenRoom.cinemaId.CinemaName,
      cinemaId: {
        _id: screenRoom.cinemaId._id,
        CinemaName: screenRoom.cinemaId.CinemaName,
        CinemaAdress: screenRoom.cinemaId.CinemaAdress
      },
      id_movie: {
        _id: _id,
        name: name,
        categoryId: categoryCol,
        image: image
      },
      hall_name: screenRoom.screenRoomId.name,
      hall_id: {
        _id: screenRoom.screenRoomId._id,
        name: screenRoom.screenRoomId.name
      },
      image_movie: image,
      name_movie: name,
      duration_movie: duration,
      price_movie: moviePriceCol[0].price,
      price_id: moviePriceCol[0]._id,
      time_from: showtime.timeFrom
    }

    dispatch(ticketAction.addProperties(ticketObject))
    setTicket(ticketObject)
    navigate('/purchase/seat')
  }

  const handleAddWatchList = () => {
    if (!userDetail) {
      toast.error('Hãy đăng nhập để thêm danh sách xem sau', {
        position: 'top-right'
      })
      return
    }
    mutateWatchlist({ movieId: movieId, userId: userDetail.message._id })
  }

  return (
    <div className="section-movie-info container ">
      <div className="max-w-[132rem] mx-auto px-[3.2rem]">
        <div className="movie-info-grid-container">
          <div className="movie-info-img-container">
            <LazyLoadImage
              className="movie-info-img"
              src={image}
              alt={'Movie Photo'}
              effect="blur"
            />
          </div>

          <div className="movie-info-attr-container">
            <h2 className="movie-info-name text-primary-nameMovie">{name}</h2>

            <div className="movie-info-small-container text-primary-locationMovie">
              {iconMovieDetail.languageIcon()}
              <p>{language}</p>
            </div>

            <div className="movie-info-small-container ">
              {iconMovieDetail.rateIcon()}
              <p>{rate}/5</p>
            </div>

            <div className="movie-info-small-container ">
              {iconMovieDetail.dateIcon()}
              <p>{getDay(fromDate)}</p>
            </div>

            <div className="movie-info-small-container ">
              {iconMovieDetail.durationIcon()}
              <p>{duration}</p>
            </div>

            <div className="movie-info-genre-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Thể loại:{' '}
              </p>
              {categoryCol?.map((category: { _id: string; name: string }) => (
                <p key={category._id}>{category.name}</p>
              ))}
            </div>

            <div className="movie-info-director-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Đạo diễn:{' '}
              </p>
              <p>{author}</p>
            </div>

            <div className="movie-info-cast-container text-primary-infoMovie">
              <p className="movie-info-title text-primary-movieColor">
                Diễn viên:{' '}
              </p>
              <p>{actor}</p>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="md" variant="outline">
                    Đoạn giới thiệu
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 w-fit">
                  <iframe
                    width="917"
                    height="516"
                    src={trailer}
                    title="Một video hạnh phúc để gửi lời chúc Valentine | Review Xàm: Gara Hạnh Phúc"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </DialogContent>
              </Dialog>
              {!watchListId.includes(_id) && userDetail ? (
                <Button
                  onClick={handleAddWatchList}
                  className="bg-primary-movieColor text-2xl flex items-center border-transparent hover:text-primary-movieColor hover:bg-transparent border hover:border-primary-movieColor"
                >
                  {isPending ? (
                    <div className="px-10">
                      <Loader className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      <Plus size={20} /> Xem sau
                    </>
                  )}
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className="movie-info-description-container">
          <h3 className="movie-info-description-heading">Nội dung</h3>
          <p className="movie-info-description">{desc}</p>
        </div>

        <h3 className="movie-info-screen-heading border-b-4 border-primary-movieColor text-primary-movieColor w-fit mb-10">
          Lịch chiếu
        </h3>
        <div className="flex md:flex-row w-full md:items-start md:justify-between sm:items-center sm:flex-col xs:flex-col xs:items-center  flex-wrap ">
          {showTimeDimension && showTimeDimension.length > 0 && (
            <MovieShowtimeSection
              handleChooseShowtime={handleChooseShowtime}
              showTimeDimension={showTimeDimension}
              dataMovie={dataMovie}
            />
          )}
          {!showTimeDimension ||
            (showTimeDimension.length == 0 && (
              <div className="movie-info-screen-container md:basis-3/5 lg:basis-2/3 sm:w-full xs:w-full">
                <div className="movie-info-screen-container-3d bg-background-third ">
                  <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
                    {chuyenDoiNgay(new Date())}
                  </h2>

                  <div className="h-32 text-3xl flex items-center justify-center w-full">
                    Không có lịch chiếu ngày này
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
