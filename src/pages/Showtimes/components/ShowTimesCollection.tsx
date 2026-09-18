import { getAllHasShow } from '@/api/movie'
import { useQuery } from '@tanstack/react-query'
// import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { useShowTimeContext } from '../contexts'
import { ShowtimesCard } from './ShowtimesCard'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,

  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'
import { chuyenDoiNgay } from '@/utils'
const days = [
  {
    day: '4 ngày',
    value: '4'
  },
  {
    day: '8 ngày',
    value: '8'
  },
  {
    day: '10 ngày',
    value: '10'
  }
]

export const ShowTimesCollection = () => {
  const { filterMovieByCategory } = useShowTimeContext()
  const [daySelect, setDaySelect] = useState({
    daySelected: '4',
    currentDay: new Date()
  })

  const { data: dataMovies, isLoading } = useQuery({
    queryKey: ['ALL_MOVIES', filterMovieByCategory],
    queryFn: () => getAllHasShow(filterMovieByCategory)
  })
  if (isLoading) {
    return (
      <HashLoader
        cssOverride={{ display: 'block', margin: '4.8rem auto' }}
        color="#eb3656"
      />
    )
  }
  const nextDay = [...Array(parseFloat(daySelect.daySelected))].map(
    (_, i) => new Date(Date.now() + i * 86400000)
  )

  const listDataMovieId = dataMovies?.map((movie: { _id: string }) => movie._id)||[]

  const handleSelectCurrentDay = (day: Date) => {
    setDaySelect((prev) => {
      return {
        ...prev,
        currentDay: day
      }
    })
  }
  const handleChangeValue = (value: string) => {
    setDaySelect((prev) => {
      return {
        ...prev,
        daySelected: value
      }
    })
  }

  // Lần đầu map dựa vào danh sach phim, nếu filter theo category thì map theo id
  return (
    <section className="section-showtimes">
      <div className="showtimes-collection container">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 basis-4/5 flex-wrap">
            {nextDay.map((day, index: number) => {
              return (
                <Button
                  key={index}
                  variant={'outline'}
                  className={`py-4 border-2  px-5 rounded-full  font-semibold ${day.getDate() === daySelect.currentDay.getDate() ? 'bg-primary-movieColor' : 'bg-transparent'}`}
                  onClick={() => handleSelectCurrentDay(day)}
                >
                  {chuyenDoiNgay(day)}
                </Button>
              )
            })}
          </div>
          <div className="basis-1/5 flex justify-end">
            <Select onValueChange={handleChangeValue}>
              <SelectTrigger
                className={`w-[110px] bg-transparent rounded-full text-xl  font-semibold py-4 flex px-6 border-2 border-primary-movieColor ${''}`}
              >
                <SelectValue placeholder="Chọn ngày" />
              </SelectTrigger>
              <SelectContent className=" bg-background-main p-2 border-primary-movieColor">
                <SelectGroup>
                  {days.map((day, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={day.value}
                        className={`bg-background-secondary  my-2 text-2xl text-primary-movieColor py-3 rounded-md focus:bg-accent focus:text-accent-foreground ${daySelect.daySelected === day.value ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        {day.day}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {listDataMovieId ? listDataMovieId.map((movieId: string, index : number) => {
          return (
            <ShowtimesCard
              key={index}
              movieId={movieId}
              currentDay={daySelect.currentDay}
            />
          )
        }) : 'Không tìm thấy'}
      </div>
    </section>
  )
}
