import {
  chuyenDoiNgay,
  convertAmPm,
  formatDateToISOString,
  getHourAndMinute
} from '@/utils'
import { ShowTimeType } from './MovieInfoSection'

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

interface MovieShowtimeSectionType {
  showTimeDimension: ShowTimeType[][]
  // eslint-disable-next-line no-unused-vars
  handleChooseShowtime: (state: ShowTimeType) => void
  dataMovie: { age_limit: number; slug: string }
}

function MovieShowtimeSection({
  showTimeDimension,
  handleChooseShowtime,
  dataMovie
}: MovieShowtimeSectionType) {
  return showTimeDimension.map((showTimeDay: ShowTimeType[], index: number) => {
    return (
      <div
        key={index}
        className="movie-info-screen-container md:basis-3/5 lg:basis-[47%] sm:w-full xs:w-full"
      >
        <div
          className={`movie-info-screen-container-3d bg-background-third ${showTimeDay?.length > 0 ? 'grid' : ''}`}
        >
          <h2 className="showtimes-screen bg-background-headerShow shadow-lg dark:shadow-2xl text-primary-locationMovie">
            {showTimeDay.length > 0
              ? chuyenDoiNgay(showTimeDay[0]?.date)
              : chuyenDoiNgay(new Date())}
          </h2>

          {showTimeDay?.length > 0 ? (
            showTimeDay.map((showtime: ShowTimeType, index: number) => {
              return (
                <div
                  className="showtimes-schedule md:my-8 xs:my-10"
                  key={index}
                >
                  <AlertDialog key={showtime._id}>
                    <AlertDialogTrigger asChild>
                      <button className="showtimes-startime-btn border-2 border-primary-movieColor hover:bg-primary-movieColorSecond text-primary-infoMovie xs:w-52 xs:h-20 md:w-40 md:h-16">
                        {convertAmPm(getHourAndMinute(showtime.timeFrom))}
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-3xl mb-4 mt-2">
                          {new Date().toISOString() <
                          formatDateToISOString(showtime.timeFrom)
                            ? 'Xác nhận mua vé?'
                            : 'Đã quá giờ chiếu'}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-2xl">
                          {new Date().toISOString() <
                          formatDateToISOString(showtime.timeFrom)
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
                          formatDateToISOString(showtime.timeFrom) && (
                          <AlertDialogAction
                            onClick={() => handleChooseShowtime(showtime)}
                            className="bg-primary-movieColor text-2xl px-9 py-3"
                          >
                            Tiếp tục
                          </AlertDialogAction>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )
            })
          ) : (
            <div className="h-32 text-3xl flex items-center justify-center w-full">
              Không có lịch chiếu vào ngày này
            </div>
          )}
        </div>
      </div>
    )
  })
}

export default MovieShowtimeSection
