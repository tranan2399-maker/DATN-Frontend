import DefaultLayout from '@/admin/layout/DefaultLayout'
import { ContextMain } from '@/context/Context'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { convertAmPm, getDay, getHourAndMinute } from '@/utils'
import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import ExchangeForm from './ExchangeForm'
import { CANCELLED_SHOW, ROLE_ADMIN } from '@/utils/constant'
import { FilePen, Info, Trash } from 'lucide-react'
import AlertDialogCustom from '@/components/AlertDialogCustom'
import {
  filterStatusCssBg,
  filterStatusCssText,
  filterStatusShow
} from '@/utils/methodArray'
import { FaRegTrashAlt } from 'react-icons/fa'
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
  isCheck?: boolean
}
const Showtimes = () => {
  const navigate = useNavigate()
  const { allShowTimes, removeShowtimeSoft, userDetail } =
    useContext<any>(ContextMain)

  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5) // Số người dùng trên mỗi trang
  const [changeShow, setChangeShow] = useState(false)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const [chooseShow, setChooseShow] = useState<any>([])

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

  const handleChangeBox = (value: boolean | string, item: Showtype) => {
    setChooseShow((prev: any) => {
      if (item.seatSold > 0) {
        toast.error('Lịch chiếu này đã được đặt. Không thể sửa', {
          position: 'top-right'
        })
        return
      }
      if (prev && prev?.length >= 2) return
      if (!value) return [...prev].filter((show) => show._id !== item._id)
      return [...prev, { ...item, isCheck: value }].filter(
        (show) => show.isCheck
      )
    })
  }

  const handleDeleteShow = (id: string) => {
    removeShowtimeSoft.mutate(id)
  }
  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Lịch chiếu"
          pageLink="/admin/showtimes"
          pageRetun="Lịch chiếu"
        />
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="flex items-center gap-2 hover:cursor-pointer mb-5">
              Lưu ý <Info size={20} />
            </h2>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[red]">Lưu ý</DialogTitle>
            </DialogHeader>
            <ul className="w-full ">
              <li className="list-disc text-sm my-1">
                Để chuyển đổi phim sang lịch chiếu khác khi và chỉ khi cả 2 lịch
                chiêú chưa được đặt và chưa bị hủy
              </li>
              <li className="list-disc text-sm my-1">
                Số ghế của một lịch chiếu phụ thuộc vào số ghế một phòng chiếu
              </li>
              <li className="list-disc text-sm my-1">
                Khi thêm phòng chiếu, hãy chắc chắn thông tin đã được kiểm tra
              </li>
            </ul>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="text-sm">
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="bg-white dark:bg-boxdark p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div className="lg:block hidden">
              <h2 className="text-gray-600 font-semibold">Lịch chiếu</h2>
              <span className="text-xs">Tất cả lịch chiếu</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="space-x-8 flex">
                <Link to={'/admin/showtimes/create'}>
                  <button className="bg-indigo-600 px-4 py-2 text-sm rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Tạo lịch chiếu
                  </button>
                </Link>
                {userDetail?.message?.roleIds == ROLE_ADMIN && (
                  <button
                    onClick={() =>
                      setChangeShow((prev) => {
                        if (!prev) {
                          toast.success(
                            'Hãy chọn 2 lịch chiếu mà bạn muốn đổi',
                            {
                              position: 'top-center'
                            }
                          )
                        }
                        return !prev
                      })
                    }
                    className="bg-success px-3 py-2 lg:w-40 xs:w-30 rounded-md text-white text-sm font-semibold tracking-wide cursor-pointer"
                  >
                    {changeShow ? 'Hủy' : 'Đổi lịch chiếu'}
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate('/admin/showtimes/restore')
                  }}
                  className="bg-red-500 px-5 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-red-600 transition duration-300"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollable-table">
              <div className="inline-block min-w-full shadow rounded-lg  scrollable-table">
                <table className="w-[950px] table-auto border   border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
                  <thead>
                    <tr>
                      {changeShow ? (
                        <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                          Check
                        </th>
                      ) : (
                        ''
                      )}

                      <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        STT
                      </th>
                      <th className="w-[170px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
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
                      <th className="w-[200px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng Thái
                      </th>
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <th
                          className=" py-3 border-b-2 border-gray-200 bg-gray-100  text-[10px] font-semibold text-gray-600 uppercase tracking-wider text-center"
                          colSpan={2}
                        >
                          Hành Động
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentShowtime?.map((item: Showtype, index: number) => (
                      <tr key={index}>
                        {changeShow ? (
                          <td className="px-5 py-5 border-b border-gray-200  text-sm ">
                            <Checkbox
                              onCheckedChange={(value) =>
                                handleChangeBox(value, item)
                              }
                              checked={chooseShow
                                ?.map((show: { _id: string }) => show._id)
                                .includes(item._id)}
                              disabled={
                                (chooseShow && chooseShow.length >= 2) ||
                                item.seatSold > 0 ||
                                item.status === CANCELLED_SHOW
                                  ? true
                                  : false
                              }
                              className="bg-white"
                            />
                          </td>
                        ) : (
                          ''
                        )}

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
                            <span className="relative ">
                              {filterStatusShow(item?.status)}
                            </span>
                          </span>
                        </td>
                        {userDetail?.message?.roleIds == ROLE_ADMIN && (
                          <td className="px-3 py-5 border-b border-gray-200 text-sm ">
                            <div className="flex gap-x-3">
                              <button
                                className="middle none center   rounded-lg bg-blue-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none  disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                disabled={item.seatSold > 0}
                              >
                                <Link
                                  to={`/admin/showtimes/update/${item?._id}`}
                                >
                                  <FilePen size={18} />
                                </Link>
                              </button>
                              <AlertDialogCustom
                                title="Xóa lịch chiếu"
                                description="Bạn có chắc chắn muốn xóa lịch chiếu không ?"
                                fnContinue={() => handleDeleteShow(item._id)}
                                clxCancle="border border-[white] text-sm"
                                clxContinue="bg-white text-black text-sm"
                                clxContent="w-fit"
                              >
                                <button
                                  className="middle none center mr-4 rounded-lg py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-red-500 hover:shadow-lg hover:shadow-red-500/40 shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                  data-ripple-light="true"
                                  disabled={item.seatSold > 0}
                                >
                                  <Trash size={18} />
                                </button>
                              </AlertDialogCustom>
                            </div>
                          </td>
                        )}
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
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
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
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
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
        <Dialog open={chooseShow && chooseShow.length >= 2 ? true : false}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="w-fit">
            <DialogHeader>
              <DialogTitle>Chuyển đổi lịch chiếu</DialogTitle>
            </DialogHeader>
            <ExchangeForm shows={chooseShow} setChooseShow={setChooseShow} />
          </DialogContent>
        </Dialog>
      </DefaultLayout>
    </>
  )
}

export default Showtimes
