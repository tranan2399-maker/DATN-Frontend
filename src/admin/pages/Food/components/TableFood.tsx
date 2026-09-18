import { Food } from '@/admin/types/food'
import { getAllFood, softDeleteFood } from '@/api/food'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaEdit } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
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
const TableFood = () => {
  const { data, isLoading, isError } = useQuery<Food[]>({
    queryKey: ['FOOD'],
    queryFn: getAllFood
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
  const [isOpenConfirm, setOpenConfirm] = useState(false)
  const idDelete = useRef<string>()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: softDeleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['FOOD'] })
      queryClient.invalidateQueries({ queryKey: [FOOD] })

      toast.success('Xóa đồ ăn thành công')
    },
    onError: () => {
      toast.error('Xóa đồ ăn thất bại')
    }
  })

  const handleRemoveFood = () => {
    mutate(idDelete.current!)
    setOpenConfirm(false)
  }
  const handleShowConfirm = (id: string | undefined) => {
    idDelete.current = id
    setOpenConfirm(true)
  }

  if (isLoading || !data) {
    return <Loader />
  }
  if (isError) {
    return <div>Lỗi</div>
  }

  return (
    <>
      <div className="rounded-sm border bg-white dark:bg-boxdark border-stroke px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <div className="text-center mb-4 flex items-center justify-start">
          <button
            onClick={() => {
              navigate('/admin/food/add')
            }}
            className="bg-indigo-600 flex items-center px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            Thêm đồ ăn <FaPlusCircle size={20} className="ml-4" />
          </button>
        </div>
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
                      {food && food?.price?.toLocaleString('vi-VN')} VND
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigate(`/admin/food/edit/${food._id}`)
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleShowConfirm(food._id)}
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
        open={isOpenConfirm}
        title="Bạn có chắc muốn xóa đồ ăn này?"
        subTitle="Đồ ăn sẽ được chuyển vào bảng xóa."
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleRemoveFood}
      />
    </>
  )
}

export default TableFood
