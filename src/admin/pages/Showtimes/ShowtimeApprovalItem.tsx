import { useContext, useState } from 'react'
import { convertAmPm, getDay, getHourAndMinute } from '@/utils'
import { FileCheck, FileX } from 'lucide-react'
import TooltipComponent from '@/components/TooltipComponent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApprovalShowTimes, updateApprovalShowTimes } from '@/api/showtime'
import Loading from '@/admin/components/Loading/Loading'
import { toast } from 'react-toastify'
import { APPROVAL_SHOW, ROLE_ADMIN, SHOWTIMES_ADMIN } from '@/utils/constant'
import { ContextMain } from '@/context/Context'
import {
  filterStatusCssBg,
  filterStatusCssText,
  filterStatusShow
} from '@/utils/methodArray'

interface Showtype {
  screenRoomId: {
    name: string
  }
  movieId: {
    name: string
  }
  timeFrom: string
  date: string
  seatSold: number
  SeatId: []
  status: string
  _id: string
}
function ShowtimeApprovalItem() {
  const { removeShowtime, userDetail } = useContext<any>(ContextMain)
  const queryClient = useQueryClient()
  const { data: allShowTimes, isFetching } = useQuery({
    queryKey: [APPROVAL_SHOW],
    queryFn: () => getApprovalShowTimes()
  })
  const { mutate: updateApproval, isPending } = useMutation({
    mutationFn: (id: string) => updateApprovalShowTimes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APPROVAL_SHOW]
      })
      queryClient.invalidateQueries({
        queryKey: [SHOWTIMES_ADMIN]
      })
      toast.success('Phê duyệt thành công', {
        position: 'top-right'
      })
    }
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5) // Số người dùng trên mỗi trang
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  if (isFetching || isPending) return <Loading />
  // Lấy mảng người dùng cho trang hiện tại
  const currentShowtime = allShowTimes?.slice(indexOfFirstUser, indexOfLastUser)

  // Logic xử lý khi chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  // Tính toán số trang
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(allShowTimes?.length / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage((pre) => pre + 1)
    }
  }
  const formatDate = (dateTimeString: string, type: string) => {
    const date = new Date(dateTimeString)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    if (type == 'hour') {
      return getHourAndMinute(convertAmPm(formattedDate))
    }
    return getDay(convertAmPm(formattedDate))
  }
  const handleUpdateApproval = (id: string) => {
    updateApproval(id)
  }
  const handleDeleteShow = (id: string) => {
    removeShowtime(id)
  }
  return (
    <div className="bg-white dark:bg-boxdark p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollable-table">
          <div className="inline-block min-w-full shadow rounded-lg  scrollable-table">
            <table className="w-[950px] table-auto border   border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
              <thead>
                <tr>
                  <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="w-[150px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Phòng Chiếu
                  </th>
                  <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Tên Phim
                  </th>
                  <th className="w-[100px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày Chiếu
                  </th>
                  <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Giờ chiếu
                  </th>
                  <th className="w-[100px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Ghế đặt
                  </th>
                  <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider ">
                    Số ghế
                  </th>
                  <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th
                    className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-[10px] font-semibold text-gray-600 uppercase tracking-wider text-center"
                    colSpan={2}
                  >
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentShowtime?.map((item: Showtype, index: number) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm ">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap ">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200  text-sm ">
                      <div className="flex items-center text-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {item?.screenRoomId?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {' '}
                        {item?.movieId?.name}
                      </p>
                    </td>
                    <td className="px-4 py-5 border-b border-gray-200  text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatDate(item?.date, 'day')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatDate(item?.timeFrom, 'hour')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {item?.seatSold || 0}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item?.SeatId ? item?.SeatId.length : 0}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200  text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold  ${filterStatusCssText(item.status)} leading-tight w-full text-center `}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${filterStatusCssBg(item.status)} opacity-50 rounded-full `}
                        ></span>
                        <span className="relative ">{filterStatusShow(item?.status)}</span>
                      </span>
                    </td>

                    <td className="px-3 py-5 border-b border-gray-200 text-sm ">
                      <div className="flex gap-x-3">
                        {userDetail?.message?.roleIds ==
                          ROLE_ADMIN && (
                          <TooltipComponent
                            tooltip="Phê duyệt lịch chiếu"
                            className="text-sm"
                          >
                            <button
                              className="middle none center  rounded-lg bg-blue-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                              onClick={() => handleUpdateApproval(item._id)}
                            >
                              <FileCheck size={18} />
                            </button>
                          </TooltipComponent>
                        )}

                        <TooltipComponent
                          tooltip="Hủy lịch chiếu"
                          className="text-sm"
                        >
                          <button
                            className="middle none center rounded-lg py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-red-500 hover:shadow-lg hover:shadow-red-500/40 shadow-red-500/20"
                            data-ripple-light="true"
                            onClick={() => handleDeleteShow(item._id)}
                          >
                            <FileX size={18} />
                          </button>
                        </TooltipComponent>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              aria-label="Page navigation"
              className="flex items-center justify-center mt-3"
            >
              <ul className="inline-flex space-x-2">
                <li key={'1'}>
                  <button
                    className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
                    onClick={handleNextPage}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                {pageNumbers.map((number, index) => (
                  <>
                    <li key={index}>
                      <button
                        className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    </li>
                  </>
                ))}
                <li>
                  <button className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowtimeApprovalItem
