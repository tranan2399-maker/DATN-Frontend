import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { FaTrashAlt, FaUndo } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
  getAllRoomsDestroy,
  HarddeleteRooms,
  undoSoftDeleteRooms
} from '@/api/screeningrooms'
import { useContext } from 'react'
import { ContextMain } from '@/context/Context'
import { ROLE_ADMIN } from '@/utils/constant'
import AlertDialogCustom from '@/components/AlertDialogCustom'
import {
  filterStatusCssBg,
  filterStatusCssText,
  filterStatusRoom
} from '@/utils/methodArray'

const TableRoomsDestroy: React.FC = () => {
  const { userDetail } = useContext(ContextMain)
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ['ROOMS_SOFT'],
    queryFn: () => getAllRoomsDestroy()
  })

  const undoSoftDeleteMutation = useMutation({
    mutationFn: undoSoftDeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ROOMS'] })
      queryClient.invalidateQueries({ queryKey: ['ROOMS_SOFT'] })
      toast.success('Khôi phục thành công')
    },
    onError: () => {
      toast.error('Khôi phục thất bại')
    }
  })
  const hardDeleteMutation = useMutation({
    mutationFn: HarddeleteRooms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ROOMS'] })
      queryClient.invalidateQueries({ queryKey: ['ROOMS_SOFT'] })
      toast.success('Xóa cứng thành công')
    },
    onError: () => {
      toast.error('Xóa cứng thất bại')
    }
  })

  const handleRemoveRooms = (id: string, destroy: boolean) => {
    if (destroy) {
      // Nếu đã bị xóa mềm, hiển thị nút khôi phục
      undoSoftDeleteMutation.mutate(id)
      //   navigate()
    } else {
      // Nếu chưa bị xóa mềm, hiển thị nút xóa
      hardDeleteMutation.mutate(id)
    }
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
      {/* Room Table */}
      <div className="max-w-full overflow-x-auto bg-white dark:bg-boxdark px-5 py-7 shadow-lg rounded-md">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-2 px-2 font-medium-600 text-primary-white xl:pl-11">
                  STT
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">
                  Tên Phòng Chiếu
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">
                  Số Ghế
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">
                  Máy chiếu
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium-600 text-primary-white">
                  Trạng thái
                </th>
                {userDetail?.message?.roleIds == ROLE_ADMIN && (
                  <th className="py-4 px-4 font-medium-600 text-primary-white">
                    Hành động
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((rooms: any, index: number) => (
                <tr key={rooms._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {index}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{rooms.name ?? ''}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">
                      {rooms.NumberSeat ?? ''}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">
                      {rooms.projector ?? ''}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`${filterStatusCssBg(rooms.status)} rounded-full text-center py-1 font-bold text-sm ${filterStatusCssText(rooms.status)}`}
                    >
                      {filterStatusRoom(rooms.status)}
                    </p>
                  </td>
                  {userDetail?.message?.roleIds == ROLE_ADMIN && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleRemoveRooms(rooms._id as string, true)
                          }
                          className="flex items-center justify-center text-gray-6 hover:text-gray-9"
                        >
                          <FaUndo size={16} />
                        </button>
                        <AlertDialogCustom
                          title="Xóa phòng chiếu"
                          description="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa phòng chiếu không ?"
                          fnContinue={() => handleRemoveRooms(rooms._id, false)}
                          clxCancle="border border-[white] text-sm"
                          clxContinue="bg-white text-black text-sm"
                          clxContent="w-fit"
                        >
                          <button className="flex items-center justify-center text-gray-6 hover:text-gray-9">
                            <FaTrashAlt size={16} />
                          </button>
                        </AlertDialogCustom>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TableRoomsDestroy
