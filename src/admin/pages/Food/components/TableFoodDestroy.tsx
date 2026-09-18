import { Food } from '@/admin/types/food'
import { getAllFoodDestroy, removeFood, restoreFood } from '@/api/food'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { FaRegTrashCan } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { ConfirmDialog } from '@/admin/components/Confirm'
import { useState, useRef } from 'react'
import Loader from '@/admin/common/Loader'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { FOOD } from '@/utils/constant'

const ITEMS_PER_PAGE = 10
// ...rest of your imports and TableFood component
const TableFoodDestroy = () => {
  const { data, isLoading, isError } = useQuery<Food[]>({
    queryKey: ['FOOD'],
    queryFn: getAllFoodDestroy
  })
  /*------------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  //tính mục phân trang
  const endIndex = currentPage * itemsPerPage
  const startIndex = endIndex - itemsPerPage
  const currentItems = (data && data.slice(startIndex, endIndex)) || []
  // Tính số trang
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : 0

  //phương thức chuyển trang
  const setPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, pageCount))
    setCurrentPage(newPage)
  }

  const renderPagination = () => {
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(currentPage - 1)}
              // disabled={currentPage === 1}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem
              key={page}
              {...(currentPage === page && { active: 'true' })}
            >
              <PaginationLink onClick={() => setPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(currentPage + 1)}
              // disabled={currentPage === pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  /*------------------------------------------------- */
  const queryClient = useQueryClient()
  const [isOpenConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [isOpenConfirmRestore, setOpenConfirmRestore] = useState(false)
  const idToOperate = useRef<string>()

  const { mutate: remove } = useMutation({
    mutationFn: removeFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FOOD'] })
      toast.success('Xóa thực phẩm thành công')
    },
    onError: () => {
      toast.error('Xóa thực phẩm thất bại')
    }
  })

  const { mutate: restore } = useMutation({
    mutationFn: restoreFood, // Bạn cần cung cấp hàm restoreFood tương ứng
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FOOD'] })
      queryClient.invalidateQueries({ queryKey: [FOOD] })
      toast.success('Khôi phục thực phẩm thành công')
    },
    onError: () => {
      toast.error('Khôi phục thực phẩm thất bại')
    }
  })

  const handleRemoveFood = () => {
    remove(idToOperate.current!)
    setOpenConfirmDelete(false)
  }

  const handleRestoreFood = () => {
    restore(idToOperate.current!)
    setOpenConfirmRestore(false)
  }

  const handleShowConfirmDelete = (id: string|undefined) => {
    idToOperate.current = id
    setOpenConfirmDelete(true)
  }

  const handleShowConfirmRestore = (id: string|undefined) => {
    idToOperate.current = id
    setOpenConfirmRestore(true)
  }

  if (isLoading || !data) {
    return <Loader />
  }
  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
      <div className="rounded-sm border bg-white dark:bg-boxdark border-stroke px-5 pt-6 py-2.5 shadow-default sm:px-7.5 xl:py-10">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium-600 text-primary-white xl:pl-11">
                  STT
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium-600 text-primary-white">
                  Tên
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium-600 text-primary-white">
                  Ảnh
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium-600 text-primary-white">
                  Giá
                </th>
                <th className="py-4 px-4 font-medium-600 text-primary-white">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((food, index) => (
                <tr key={food._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-sm font-medium text-primary-white">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{food.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">
                      {food && food.price && food?.price.toLocaleString('vi-VN')} VND
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleShowConfirmRestore(food._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="28"
                          height="28"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#ffab91"
                            d="M42.849,16.686l-3.536-3.536c-0.781-0.781-2.047-0.781-2.828,0L28,21.636l-8.485-8.485	c-0.781-0.781-2.047-0.781-2.828,0l-3.536,3.536c-0.781,0.781-0.781,2.047,0,2.828L21.636,28l-8.485,8.485	c-0.781,0.781-0.781,2.047,0,2.828l3.536,3.536c0.781,0.781,2.047,0.781,2.828,0L28,34.364l8.485,8.485	c0.781,0.781,2.047,0.781,2.828,0l3.536-3.536c0.781-0.781,0.781-2.047,0-2.828L34.364,28l8.485-8.485	C43.63,18.734,43.63,17.467,42.849,16.686z"
                          ></path>
                          <path
                            fill="none"
                            stroke="#18193f"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="3"
                            d="M31.608,25.244L30.364,24l8.485-8.485c0.781-0.781,0.781-2.047,0-2.828l-3.536-3.536c-0.781-0.781-2.047-0.781-2.828,0L24,17.636	l-8.485-8.485c-0.781-0.781-2.047-0.781-2.828,0l-3.536,3.536c-0.781,0.781-0.781,2.047,0,2.828L17.636,24l-8.485,8.485	c-0.781,0.781-0.781,2.047,0,2.828l3.536,3.536c0.781,0.781,2.047,0.781,2.828,0L24,30.364"
                          ></path>
                          <path
                            fill="none"
                            stroke="#18193f"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="3"
                            d="M34.5,28.5l-5,5l5,5"
                          ></path>
                          <path
                            fill="none"
                            stroke="#18193f"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="3"
                            d="M29.5,33.5H39c3.038,0,5.5,2.462,5.5,5.5v5.5"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleShowConfirmDelete(food._id)}
                      >
                        <FaRegTrashCan size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderPagination()}
      <ConfirmDialog
        open={isOpenConfirmDelete}
        title="Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?"
        subTitle="Không thể hoàn tác hành động này"
        onCancel={() => setOpenConfirmDelete(false)}
        onConfirm={handleRemoveFood}
      />
      <ConfirmDialog
        open={isOpenConfirmRestore}
        title="Bạn có chắc muốn khôi phục sản phẩm này?"
        subTitle="Sản phẩm sẽ được khôi phục lại"
        onCancel={() => setOpenConfirmRestore(false)}
        onConfirm={handleRestoreFood}
      />
    </>
  )
}

export default TableFoodDestroy
