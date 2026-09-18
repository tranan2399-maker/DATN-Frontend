import { ConfirmDialog } from '@/admin/components/Confirm'
import { Movie } from '@/admin/types/movie'
import { getAllMovie, softDeleteMovie } from '@/api/movie'
import { ContextMain } from '@/context/Context'
import { convertMintuteToHour } from '@/utils'
import { ROLE_ADMIN } from '@/utils/constant'
import { filterStatusMovie } from '@/utils/methodArray'
// import { Item } from '@radix-ui/react-dropdown-menu'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { any } from 'joi'
// import { any } from 'joi'
// import { error } from 'console'
// import { any } from 'joi'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaPlusCircle, FaRegTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TableMovie = () => {
  const queryClient = useQueryClient()
  const { userDetail } = useContext(ContextMain)
  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()
  const navigate = useNavigate()
  // fetch category by react-query
  // const { data, isLoading, isError } = useQuery<Movie[]>({
  //   queryKey: ['MOVIE'],
  //   queryFn: getAllMovie
  // })


  // // page
  // const ITEMS_PER_PAGE = 10
  // const [currentPage, setCurrentPage] = useState(1)
  // const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  // //tính mục phân trang
  // const endIndex = currentPage * itemsPerPage
  // const startIndex = endIndex - itemsPerPage
  // const currentItems = (data && data.slice(startIndex, endIndex)) || []
  // // Tính số trang
  // const pageCount = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0
  //phương thức chuyển trang

  // 
  // fetch category by react-query
  const { data: movies, isLoading, isError } = useQuery<Movie[]>({
    queryKey: ['MOVIE'],
    queryFn: getAllMovie
  })
  // Tạo trạng thái cho kết quả tìm kiếm
  const [searchTerm, setSearchTerm] = useState('')

  // Hàm xử lý tìm kiếm
  const searchMovies = (movies: Movie[], term: string): Movie[] => {
    return movies.filter(movie =>
      movie.name.toLowerCase().includes(term.toLowerCase())
    )
  }
  const setPage = (page: number) => {
    setCurrentPage(page)
  }
  // Phân trang
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  // const currentItems = displayMovies.slice(startIndex, endIndex)
  // const pageCount = Math.ceil(displayMovies.length / ITEMS_PER_PAGE)

  // Thay đổi trạng thái lưu trữ danh sách phim được hiển thị
  const [moviesToDisplay, setMoviesToDisplay] = useState<Movie[]>([])

  // Khi danh sách phim thay đổi hoặc khi tìm kiếm thay đổi, cập nhật danh sách phim được hiển thị
  useEffect(() => {
    if (searchTerm) {
      // Nếu có từ khóa tìm kiếm, sử dụng hàm tìm kiếm để lọc danh sách phim
      if (movies) {
        setMoviesToDisplay(searchMovies(movies, searchTerm))
      }
    } else {
      // Nếu không, hiển thị toàn bộ danh sách phim
      if (movies) {
      setMoviesToDisplay(movies)
    }
    }
  }, [searchTerm, movies])
  // Sử dụng displayMovies nếu có hoặc một mảng trống nếu không
  const currentItems = (moviesToDisplay && moviesToDisplay.slice(startIndex, endIndex)) || []
  // Sử dụng moviesToDisplay.length nếu có hoặc 0 nếu không
  const pageCount = moviesToDisplay ? Math.ceil(moviesToDisplay.length / ITEMS_PER_PAGE) : 0




  // delete category by mutation react-query
  const { mutate } = useMutation({
    mutationFn: softDeleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MOVIE'] })
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
  const handleShowConfirm = (id: string) => {
    idDelete.current = id
    setOpenConfirm(true)
  }

  if (isLoading || !movies) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }
  // console.log(data)
  
  // render
  return (
    <>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
        <div className="max-w-full overflow-x-auto bg-white dark:bg-boxdark px-5 py-7 shadow-lg rounded-md scrollable-table">
          <div className="text-center mb-5 flex items-center justify-start space-x-4">
            {userDetail?.message?.roleIds == ROLE_ADMIN && (
              <button
                onClick={() => {
                  navigate('/admin/movie/add')
                }}
                className="bg-indigo-600 flex items-center px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-700 transition duration-300"
              >
                <span className="mr-2">Thêm phim</span>
                <FaPlusCircle size={20} />
              </button>
            )}
            <button
              onClick={() => {
                navigate('/admin/movie/softdelete')
              }}
              className="bg-red-500 px-5 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-red-600 transition duration-300"
            >
              <FaRegTrashAlt />
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên..."
              className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
            />
          </div>



          <table className=" w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
            <thead>
              {/* <tr className="bg-gray-200 text-left dark:bg-meta-4 border border-gray-400 dark:border-strokedark"> */}
              <tr className="bg-gray-200 text-left dark:bg-meta-4 ">
                <th className="py-4 px-2 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark ">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Tên phim
                </th>
                <th className="min-w-[110px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Hình ảnh
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Ngôn ngữ
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Diễn viên
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Thời lượng
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Quốc gia
                </th>
                <th className="min-w-[130px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Giới hạn tuổi
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Từ ngày
                </th> */}
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Đến ngày
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Tác giả
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Ngôn ngữ
                </th> */}
                <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Diễn viên
                </th>
                {/* <th className="min-w-[150px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">Đoạn phim giới thiệu</th> */}
                <th className="min-w-[180px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark">
                  Trạng thái
                </th>
                <th className="min-w-[350px] py-4 px-4 font-medium text-gray-800 border-b border-gray-400 dark:border-strokedark text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>

              {currentItems.map((movie: any, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-400 dark:border-strokedark"
                >
                  <td className="py-5 px-5 dark:border-strokedark">
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
                    <p className="text-gray-800">{movie.actor}</p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {convertMintuteToHour(movie.duration)}
                    </p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.country}</p>
                  </td>
                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.age_limit}</p>
                  </td>

                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.author}</p>
                  </td>

                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">{movie.actor}</p>
                  </td>

                  <td className="py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800">
                      {filterStatusMovie(movie.status)}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b dark:border-strokedark bg-white dark:bg-boxdark text-sm ">
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-3">
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <div
                          title={
                            movie.status === 'IS_SHOWING' // Title nếu movie.status là 'IS_SHOWING'
                              ? 'Không thể cập nhật phim đang chiếu'
                              : movie.showTimes && movie.showTimes.length > 0 // Title nếu showTimes có xuất chiếu
                                ? 'Không thể cập nhật phim đã có xuất chiếu'
                                : '' // Title mặc định
                          }
                        >
                          <button
                            onClick={() =>
                              navigate(`/admin/movie/edit/${movie._id}`)
                            }
                            className="rounded-lg bg-blue-500 py-3 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            // disabled={movie.status === 'IS_SHOWING'}
                            disabled={
                              movie.status === 'IS_SHOWING' ||
                              // movie.showTimes.length > 0
                              (movie.showTimes && movie.showTimes.length > 0)
                            }
                          >
                            Cập nhật
                          </button>
                        </div>
                      )}
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <div
                          title={
                            movie.status === 'IS_SHOWING' // Title nếu movie.status là 'IS_SHOWING'
                              ? 'Không thể xóa phim đang chiếu'
                              : movie.showTimes && movie.showTimes.length > 0 // Title nếu showTimes có xuất chiếu
                                ? 'Không thể xóa phim đã có xuất chiếu'
                                : '' // Title mặc định
                          }
                        >
                          <button
                            className="rounded-lg bg-red-500 py-3 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={() => handleShowConfirm(movie._id)}
                            disabled={
                              movie.status === 'IS_SHOWING' ||
                              // movie.showTimes.length > 0
                              (movie.showTimes && movie.showTimes.length > 0)
                            }
                          >
                            Xóa
                          </button>
                        </div>
                      )}

                      <div>
                        <Link
                          to={`/admin/movie/${movie.slug}`}
                          className="inline-block"
                        >
                          <button
                            className="rounded-lg bg-green-400 py-3 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-400/20 transition-all hover:shadow-lg hover:shadow-green-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                          // title='abc'
                          >
                            Chi tiết
                          </button>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-controls flex justify-center mt-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`mx-2 px-4 py-2 border border-[#eee] dark:border-strokedark hover:bg-gray-200 focus:bg-gray-200 
                  ${currentPage === page ? 'bg-gray-500 text-white' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      <ConfirmDialog
        open={isOpenConfirm}
        title="Bạn có chắc muốn xóa không"
        subTitle="Xóa đi sẽ đưa vào thùng rác"
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
    </>
  )
}

export default TableMovie
