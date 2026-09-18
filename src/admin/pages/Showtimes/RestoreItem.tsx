import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { TbRestore } from 'react-icons/tb'
import Loading from '@/admin/components/Loading/Loading'
import { convertAmPm, getDay, getHourAndMinute } from '@/utils'
import AlertDialogCustom from '@/components/AlertDialogCustom'
import { Trash } from 'lucide-react'
import {
  filterStatusCssBg,
  filterStatusCssText,
  filterStatusShow
} from '@/utils/methodArray'
import { ROLE_ADMIN } from '@/utils/constant'

function RestoreItem() {
  const { showTimeSoft, removeShowtime, restoreShowtime, userDetail } =
    useContext<any>(ContextMain)
  //   const [confirmItemId, setConfirmItemId] = useState(null) // State để lưu id của item được chọn xóa
  //   const [confirmRestoreId, setConfirmRestoreId] = useState(null) // State để lưu id của item được chọn xóa
  //   const [conFirmRestore, setConFirmRestore] = useState(false)
  //   const [conFirm, setConFirm] = useState(false)
  const formatDate = (dateTimeString: string, type: string) => {
    const date = new Date(dateTimeString)
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    if (type == 'hour') {
      return getHourAndMinute(convertAmPm(formattedDate))
    }
    return getDay(convertAmPm(formattedDate))
  }
  //   const handleDelete = (itemId: any) => {
  //     setConfirmItemId(itemId) // Lưu id của item được chọn vào state
  //     setConFirm(true) // Hiển thị modal
  //   }
  //   const handleRestore = (itemId: any) => {
  //     setConfirmRestoreId(itemId) // Lưu id của item được chọn vào state
  //     setConFirmRestore(true) // Hiển thị modal
  //   }

  const handleConfirmDelete = (id: string) => {
    removeShowtime(id)
  }
  const handleConfirmRestore = (id: string) => {
    restoreShowtime.mutate(id)
  }
  if (showTimeSoft.isLoading) {
    return <Loading />
  }
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 overflow-x-auto scrollable-table">
      <table className="w-[900px] border-collapse  bg-white  dark:bg-boxdark text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Phòng Chiếu
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Tên Phim
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Ngày Chiếu
            </th>
            <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
              Giờ chiếu
            </th>
            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            Kết Thúc Phim
          </th> */}
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Trạng Thái
            </th>
            {userDetail?.message?.roleIds == ROLE_ADMIN && (
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Hành Động
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {showTimeSoft && showTimeSoft?.data?.length > 0 ? (
            showTimeSoft?.data?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {item?.screenRoomId.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-700">
                    {item?.movieId.name}
                  </span>
                </td>
                <td className="px-6 py-4"> {formatDate(item?.date, 'day')}</td>
                <td className="px-6 py-4">
                  {formatDate(item?.timeFrom, 'hour')}
                </td>
                {/* <td className="px-6 py-4">{formatDate(item?.timeTo)}</td> */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full ${filterStatusCssBg(item.status)} px-2 py-1 text-xs font-semibold ${filterStatusCssText(item.status)}`}
                  >
                    {/* <span
                      className={`h-1.5 w-1.5 rounded-full ${filterStatusCssText(item.status)}`}
                    ></span> */}
                    {filterStatusShow(item?.status)}
                  </span>
                </td>
                {userDetail?.message?.roleIds == ROLE_ADMIN && (
                  <td className="px-3 py-4">
                    <div className="flex justify-between items-center">
                      <AlertDialogCustom
                        title="Xóa lịch chiếu"
                        description="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa lịch chiếu không ?"
                        fnContinue={() => handleConfirmDelete(item._id)}
                        clxCancle="border border-[white] text-sm"
                        clxContinue="bg-white text-black text-sm"
                        clxContent="w-fit"
                      >
                        <button
                          className="middle none center rounded-lg py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-red-500 hover:shadow-lg hover:shadow-red-500/40 shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          data-ripple-light="true"
                          disabled={item.seatSold > 0}
                        >
                          <Trash size={18} />
                        </button>
                      </AlertDialogCustom>
                      <AlertDialogCustom
                        title="Khôi phục lịch chiếu"
                        description="Bạn có chắc chắn muốn khôi phục lịch chiếu không ?"
                        fnContinue={() => handleConfirmRestore(item._id)}
                        clxCancle="border border-[white] text-sm"
                        clxContinue="bg-white text-black text-sm"
                        clxContent="w-fit"
                      >
                        <button
                          className="middle none center rounded-lg py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-green-500 hover:shadow-lg hover:shadow-red-500/40 shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          data-ripple-light="true"
                          disabled={item.seatSold > 0}
                        >
                          <TbRestore
                            className="text-xl cursor-pointer"
                            // onClick={() => handleRestore(item._id)}
                          />
                        </button>
                      </AlertDialogCustom>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="hover:bg-gray-50">
              <td colSpan={6} className="text-center py-3">
                Không có lịch chiếu bị xóa
              </td>
            </tr>
          )}
          {/* {conFirm && (
          <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
              <h1 className="text-xl mb-4 font-bold text-slate-500">
                Do you Want Delete
              </h1>
              <button
                className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setConFirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                onClick={handleConfirmDelete}
              >
                Ok
              </button>
            </div>
          </div>
        )} */}

          {/* {conFirmRestore && (
          <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
              <h1 className="text-xl mb-4 font-bold text-slate-500">
                Bạn có muốn khôi phục không
              </h1>
              <button
                className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                onClick={() => setConFirmRestore(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                onClick={handleConfirmRestore}
              >
                Ok
              </button>
            </div>
          </div>
        )} */}
        </tbody>
      </table>
    </div>
  )
}

export default RestoreItem
