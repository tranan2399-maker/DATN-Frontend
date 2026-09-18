import { ConfirmDialog } from '@/admin/components/Confirm'
import Loading from '@/admin/components/Loading/Loading'
import { Movie } from '@/admin/types/movie'
import { getAllsoftDelete, removeMovie, restoreMovie } from '@/api/movie'
import { ContextMain } from '@/context/Context'
import { convertMintuteToHour } from '@/utils'
import { ROLE_ADMIN } from '@/utils/constant'
import { filterStatusMovie } from '@/utils/methodArray'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function TableItemSoft() {
  const queryClient = useQueryClient()
  const { userDetail } = useContext(ContextMain)
  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const [isOpenConfirm2, setOpenConfirm2] = useState(false)
  const idDelete = useRef<string>()
  const idDelete2 = useRef<string>()
  // fetch category by react-query
  const { data, isLoading } = useQuery<Movie[]>({
    queryKey: ['MOVIE_SOFT'],
    queryFn: getAllsoftDelete
  })

  // page
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  //tính mục phân trang
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = (data && data.slice(startIndex, endIndex)) || []
  // Tính số trang
  const pageCount = data ? Math.round(data.length / ITEMS_PER_PAGE) : 0
  //phương thức chuyển trang
  const setPage = (page: number) => {
    setCurrentPage(page)
  }

  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: removeMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MOVIE_SOFT'] })
      toast.success('Xóa thành công')
    },
    onError: () => {
      toast.error('Xóa thất bại')
    }
  })

  const handleRemoveMovie = () => {
    mutate(idDelete.current!)
    setOpenConfirm(false)
  }
  const { mutate: mutate2 } = useMutation({
    mutationFn: restoreMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MOVIE_SOFT'] })
      toast.success('Khôi phục thành công')
    },
    onError: () => {
      toast.error('Khôi phục thất bại')
    }
  })
  const handleRestoreMovie = () => {
    mutate2(idDelete2.current!)
    setOpenConfirm2(false)
  }

  const handleShowConfirm = (id: string) => {
    idDelete.current = id
    setOpenConfirm(true)
  }
  const handleShowConfirm2 = (id: string) => {
    idDelete2.current = id
    setOpenConfirm2(true)
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="flex flex-col gap-10">
      x
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
        <div className="max-w-full overflow-x-auto bg-white dark:bg-boxdark px-5 py-7 shadow-lg rounded-md scrollable-table">
          <div className="text-center mb-5 flex items-center justify-start "></div>
          <table className=" w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
            <thead>
              {/* <tr className="bg-gray-200 text-left dark:bg-meta-4 border border-gray-400 dark:border-strokedark"> */}
              <tr className="bg-gray-200 text-left dark:bg-meta-4 ">
                <th className="py-4 px-4 font-medium text-gray-800 xl:pl-11 border-b border-gray-400 dark:border-strokedark ">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Tên phim
                </th>
                <th className="min-w-[110px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Hình ảnh
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Ngôn ngữ
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Diễn viên
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Thời lượng
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                Quốc gia
              </th> */}
                <th className="min-w-[130px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Giới hạn tuổi
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
            Từ ngày
          </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
            Đến ngày
          </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                Tác giả
              </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
            Ngôn ngữ
          </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                Diễn viên
              </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">Đoạn phim giới thiệu</th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Trạng thái
                </th>

                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                currentItems.map((movie, index) => (
                  <tr
                    key={movie.name}
                    className="border-b border-gray-400 dark:border-strokedark"
                  >
                    <td className="py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="text-sm font-medium text-gray-800">
                        {index + 1}
                      </p>
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">{movie.name}</p>
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <img src={movie.image} alt="" className="w-16" />
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">{movie.language}</p>
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">{movie.actor}</p>
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">
                        {convertMintuteToHour(movie.duration)}
                      </p>
                    </td>
                    {/* <td className="py-5 px-4 dark:border-strokedark">
                  <p className="text-gray-800">{movie.country}</p>
                </td> */}
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">{movie.age_limit}</p>
                    </td>
                    {/* <td className="py-5 px-4 dark:border-strokedark">
              <p className="text-gray-800">
                {getDay(selectCalendar(movie.fromDate))}
              </p>
            </td>
            <td className="py-5 px-4 dark:border-strokedark">
              <p className="text-gray-800">
                {getDay(selectCalendar(movie.toDate))}
              </p>
            </td> */}
                    {/* <td className="py-5 px-4 dark:border-strokedark">
                  <p className="text-gray-800">{movie.author}</p>
                </td> */}
                    {/* <td className="py-5 px-4 dark:border-strokedark">
              <p className="text-gray-800">{movie.language}</p>
            </td> */}
                    {/* <td className="py-5 px-4 dark:border-strokedark">
                  <p className="text-gray-800">{movie.actor}</p>
                </td> */}
                    {/* <td className="py-5 px-4 dark:border-strokedark">
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:underline"
              >
                Xem đoạn giới thiệu
              </a>
            </td> */}
                    <td className="py-5 px-4 dark:border-strokedark">
                      <p className="text-gray-800">
                        {filterStatusMovie(movie.status)}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b dark:border-strokedark bg-white dark:bg-boxdark text-sm w-65 flex-wrap justify-center gap-y-3">
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <div>
                          <button
                            onClick={() => handleShowConfirm2(movie?._id)}
                            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                          >
                            Khôi phục
                          </button>
                        </div>
                      )}
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <div>
                          <button
                            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={() => handleShowConfirm(movie?._id)}
                          >
                            Xóa
                          </button>
                        </div>
                      )}

                      <div>
                        <Link to={'/admin/movie/' + movie?.slug}>
                          <button
                            className="middle none center mr-4 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            // onClick={() => handleShowConfirm(movie?._id)}
                          >
                            Chi tiết
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-400 dark:border-strokedark">
                  <td colSpan={7} className="text-center py-5">
                    Hiện tại không có phim bị xóa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-controls flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => setPage(page)}
            className="mx-2 px-4 py-2 border border-[#eee] dark:border-strokedark hover:bg-gray-200"
          >
            {page}
          </button>
        ))}
      </div>
      <ConfirmDialog
        open={isOpenConfirm}
        title="Bạn có chắc muốn xóa vĩnh viễn không"
        subTitle="Xóa đi không thể khôi phục"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveMovie}
        titleStyle={{
          fontSize: '1.5rem',
          color: '#000',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}
        subTitleStyle={{
          fontSize: '1.2rem',
          color: '#000',
          marginBottom: '1rem'
        }}
      />
      <ConfirmDialog
        open={isOpenConfirm2}
        title="Bạn có chắc muốn khôi phục không"
        subTitle="Xóa đi không thể khôi phục"
        onCancel={() => setOpenConfirm2(false)}
        onConfirm={handleRestoreMovie}
        // onConfirm={handleRemoveMovie}
        titleStyle={{
          fontSize: '1.5rem',
          color: '#000',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}
        subTitleStyle={{
          fontSize: '1.2rem',
          color: '#000',
          marginBottom: '1rem'
        }}
      />
    </div>
  )
}

export default TableItemSoft
