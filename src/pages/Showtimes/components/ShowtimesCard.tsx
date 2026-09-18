import { getOneMovie } from '@/api/movie'

import { Button } from '@/components/ui/button'
import { ShowTime } from '@/pages/MovieDetails/components/MovieInfoSection'
import {
  chuyenDoiNgay,
  convertAmPm,
  formatDateToISOString,
  getDay,
  getHourAndMinute,
  selectCalendar
} from '@/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { AVAILABLE, MOVIE_DETAIL } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'

type ShowtimesCardProps = {
  movieId: string
  currentDay: Date
}

export const ShowtimesCard = ({ movieId, currentDay }: ShowtimesCardProps) => {
  const navigate = useNavigate()

  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, movieId],
    queryFn: () => getOneMovie(movieId)
  })

  const override = {
    display: 'block',
    margin: '4.8rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  const showTimePerDay =
    dataMovie?.showTimeCol &&
    dataMovie?.showTimeCol
      ?.map((showTime: ShowTime) => {
        if (
          getDay(showTime.timeFrom) == getDay(selectCalendar(currentDay)) &&
          showTime.status === AVAILABLE
        ) {
          return showTime
        }
      })
      .filter(function (element: ShowTime) {
        return element !== undefined
      })

  return (
    <div className="showtimes-card">
      <div className="showtimes-card-leftpart">
        <div className="showtimes-img-box">
          <img
            className="showtimes-img"
            src={dataMovie.image}
            alt={dataMovie.name}
          />
        </div>

        <h2 className="showtimes-title">{dataMovie.name}</h2>
        <button
          className="showtimes-details-btn"
          onClick={() => navigate(`/movie/${dataMovie.slug}`)}
        >
          Xem chi tiết
        </button>
      </div>

      <div className="showtimes-screen-container">
        <div className="bg-background-main shadow-lg text-primary-movieColor text-3xl flex w-full justify-center py-6 font-semibold">
          {chuyenDoiNgay(currentDay)}
        </div>
        {!dataMovie.showTimeCol || dataMovie.showTimeCol.length > 0 ? (
          <div className="showtimes-schedule-container my-10 gap-y-8">
            {showTimePerDay.map(
              (showTime: { timeFrom: string; _id: string }) => {
                return (
                  <AlertDialog key={showTime._id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        key={showTime._id}
                        className="text-2xl font-semibold py-4 px-14 rounded-full border-2 bg-transparent"
                        variant={'outline'}
                      >
                        {convertAmPm(getHourAndMinute(showTime.timeFrom))}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-3xl mb-4 mt-2">
                          {new Date().toISOString() <
                          formatDateToISOString(showTime.timeFrom)
                            ? 'Xác nhận mua vé?'
                            : 'Đã quá giờ chiếu'}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-2xl">
                          {new Date().toISOString() <
                          formatDateToISOString(showTime.timeFrom)
                            ? `Phim này chỉ dành cho trẻ em trên
                          ${dataMovie?.age_limit || '10'} tuổi. Vui lòng cân nhắc
                          khi mua vé. BQL Rạp sẽ phải từ chối cho vào nếu sai
                          quy định.`
                            : 'Đã quá thời gian chọn suất chiếu này. Vui lòng chọn suất chiếu khác'}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-2xl px-9 py-3">
                          Hủy
                        </AlertDialogCancel>
                        {new Date().toISOString() <
                          formatDateToISOString(showTime.timeFrom) && (
                          <AlertDialogAction
                            onClick={() => {
                              navigate('/movie/' + dataMovie?.slug)
                            }}
                            className="bg-primary-movieColor text-2xl px-9 py-3"
                          >
                            Tiếp tục
                          </AlertDialogAction>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )
              }
            )}
          </div>
        ) : (
          <div className="h-full text-3xl flex items-center justify-center w-full">
            Không có giờ chiếu
          </div>
        )}
      </div>
    </div>
  )
}
