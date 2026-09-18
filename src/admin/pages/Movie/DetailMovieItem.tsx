import { MoviePriceCol } from '@/Interface/movieDetail'
import { getOneMovie } from '@/api/movie'
import { addCommasToNumber, convertMintuteToHour, getDay } from '@/utils'
import { MOVIE_DETAIL } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import TableShowTimeMovie from './TableShowtimeMovie'
import TableCommentMovie from './TableComment'
import Loading from '@/admin/components/Loading/Loading'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { filterStatusMovie } from '@/utils/methodArray'

function DetailMovieItem({ id }: { id: string }) {
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, id],
    queryFn: () => getOneMovie(id)
  })
  if (isLoading) return <Loading />
  return (
    <div className="flex flex-col gap-5 ">
      <div>
        <img src={dataMovie.image} width={100} alt="" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="md" variant="outline" className='text-sm bg-white p-5 shadow-default dark:border-strokedark w-fit dark:bg-boxdark rounded-sm border border-stroke'>
            Đoạn giới thiệu
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-fit">
          <iframe
            width="917"
            height="516"
            src={dataMovie?.trailer||''}
            title="Một video hạnh phúc để gửi lời chúc Valentine | Review Xàm: Gara Hạnh Phúc"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-2 gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tên phim : {dataMovie.name || ''}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Giới hạn độ tuổi : {dataMovie.age_limit || ''} tuổi
        </p>
      </div>

      <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
        Mô tả : {dataMovie?.desc || ''}
      </p>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-3 sm:gap-y-0 gap-y-2">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Đạo diễn : {dataMovie?.author || ''}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Diễn viên : {dataMovie?.actor || ''}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          {/* Trạng thái : {dataMovie?.status || ''} */}
          {filterStatusMovie(dataMovie?.status)}
        </p>
      </div>
      <p className="bg-white flex items-center p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
        Thể loại :{' '}
        {dataMovie?.categoryCol?.map((cate: { name: string; _id: string }) => {
          return (
            <div
              className="mx-2 bg-primaryAdmin rounded text-white px-2 py-1"
              key={cate._id}
            >
              {cate.name}
            </div>
          )
        })}
      </p>
      <div
        className={`grid grid-cols-${dataMovie?.prices && dataMovie?.prices?.length} gap-x-3 `}
      >
        {dataMovie?.prices?.length > 0
          ? dataMovie?.prices?.map((priceMovie: MoviePriceCol) => {
            return (
              <p
                key={priceMovie._id}
                className="bg-white p-5 flex flex-col shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke"
              >
                <span>
                  Giá phim : {addCommasToNumber(priceMovie?.price) || ''} VND
                </span>
                <span> Loại ngày : {priceMovie?.dayType || ''}</span>
              </p>
            )
          })
          : ''}
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-3 sm:gap-y-0 gap-y-2">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Thời lượng : {convertMintuteToHour(dataMovie.duration)}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Quốc gia : {dataMovie.country}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngôn ngữ : {dataMovie.language}
        </p>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-3 sm:gap-y-0 gap-y-2">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Đánh giá : {dataMovie?.rate || 0} sao
        </p>

        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Slug : {dataMovie.slug || ''}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Xóa mềm : {dataMovie.destroy ? 'Đã xoá' : 'Chưa xóa'}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-3 gap-y-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngày khởi chiếu : {getDay(dataMovie?.fromDate) || ''}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngày kết thúc : {getDay(dataMovie?.toDate) || ''}
        </p>
      </div>
      <TableShowTimeMovie dataShowtime={dataMovie && dataMovie.showTimeCol} />
      <TableCommentMovie movieId={id} />
    </div>
  )
}

export default DetailMovieItem
