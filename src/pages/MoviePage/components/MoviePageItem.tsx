import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MovieType } from '@/Interface/movie'
import { useStatusMovie } from '@/hooks/useAllMovie'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import FilterCountry from './FilterCountry'
import FilterAge from './FilterAge'
import FilterRate from './FilterRate'
import MovieRender from './MovieRender'
import { Filter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface MoviePageItemType {
  status: string
  title: string
}
interface SelectorCate {
  categories: { category: string }
}

function MoviePageItem({ status, title }: MoviePageItemType) {
  const cate_id = useSelector(
    (state: SelectorCate) => state.categories.category
  )

  const [query, setQuery] = useState({
    status: ['IS_SHOWING', 'HOT'].includes(status) ? '' : status,
    order: 'asc',
    country: '0',
    rate: status == 'HOT' ? '5' : '0',
    age: '0'
  })
  const { data: dataMovie, isLoading } = useStatusMovie(query)
  const [currentMovies, setCurrentMovie] = useState<MovieType[]>(dataMovie)

  const filterCateByMovie =
    dataMovie &&
    dataMovie?.filter((movie: { categoryId: [] }) => {
      const categoryIds = movie.categoryId.map(
        (cate: { _id: string }) => cate._id
      )
      return categoryIds.includes(cate_id)
    })

  useEffect(() => {
    if (dataMovie && cate_id == '') return setCurrentMovie(dataMovie)
    return setCurrentMovie(filterCateByMovie)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMovie, cate_id])

  const handleSort = (order: string) => {
    setQuery((prev) => {
      const old = { ...prev }
      return {
        ...old,
        order
      }
    })
  }
  const handleCloseSheet = () => {
    const sheet = document.querySelector('.sheet-close')
    if (sheet instanceof HTMLElement) {
      // Kiểm tra kiểu hoặc ép kiểu để TypeScript hiểu rằng phần tử có thể được click
      sheet.click()
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="border-b-4 py-3 border-primary-movieColor text-primary-locationMovie  text-4xl font-bold">
          {title}
        </h2>
        <div className="flex gap-3 ">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-2 rounded-full px-8 md:hidden xs:flex"
              >
                <Filter size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-50">
              <SheetHeader>
                <SheetTitle className="text-2xl">Lọc phim</SheetTitle>
              </SheetHeader>
              {status != 'HOT' && (
                <div className="mt-5">
                  <div className="text-2xl mb-5">Lọc theo đánh giá</div>
                  <FilterRate
                    setQuery={setQuery}
                    query={query}
                    className="md:hidden xs:flex"
                    handleCloseSheet={handleCloseSheet}
                  />
                  <Separator className="my-7 bg-border-calendarBorder h-[0.5px] " />
                </div>
              )}

              <div className="mt-5">
                <div className="text-2xl mb-5">Lọc theo quốc gia</div>
                <FilterCountry
                  query={query}
                  status={status}
                  setQuery={setQuery}
                  className="md:hidden xs:flex"
                  handleCloseSheet={handleCloseSheet}
                />
                <Separator className="my-7 bg-border-calendarBorder h-[0.5px] " />
              </div>
              <div className="mt-5">
                <div className="text-2xl mb-5">Lọc theo tuổi</div>
                <FilterAge
                  setQuery={setQuery}
                  query={query}
                  className="md:hidden xs:flex"
                  handleCloseSheet={handleCloseSheet}
                />
              </div>
              <SheetFooter>
                <SheetClose asChild className="sheet-close">
                  <Button type="submit" className='bg-white mt-10 text-black w-fit'>Lưu</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          {status !== 'HOT' && (
            <FilterRate
              setQuery={setQuery}
              query={query}
              className="md:flex xs:hidden"
            />
          )}

          <FilterAge
            setQuery={setQuery}
            query={query}
            className="md:flex xs:hidden"
          />
          <FilterCountry
            query={query}
            status={status}
            setQuery={setQuery}
            className="md:flex xs:hidden"
          />
          <Button
            variant="outline"
            className={`rounded-full border-2 text-xl px-10 py-5 hover:border-2 bg-transparent font-bold ${query.order == 'desc' ? 'bg-primary-movieColor' : ''}`}
            onClick={() => handleSort('desc')}
          >
            Mới nhất
          </Button>
          <Button
            variant="outline"
            className={`rounded-full border-2 text-xl px-10 py-5 hover:border-2 bg-transparent font-bold ${query.order == 'asc' ? 'bg-primary-movieColor' : ''}`}
            onClick={() => handleSort('asc')}
          >
            Lâu nhất
          </Button>
        </div>
      </div>
      <MovieRender
        currentMovies={currentMovies}
        isLoading={isLoading}
        query={query}
      />
    </>
  )
}

export default MoviePageItem
