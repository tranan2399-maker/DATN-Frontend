import { useContext, useEffect, useState } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { block, getUser, unblock, updateUserId } from '@/api/auth'
import { toast } from 'react-toastify'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import { filterRole } from '@/utils/methodArray'
import { LockKeyhole, PencilLine } from 'lucide-react'
import { ROLE_ADMIN } from '@/utils/constant'
import { ContextMain } from '@/context/Context'
// import { token } from '@/api/baseAuth'
const arrayRole = [
  { _id: '662ce317888a9655fbf8192e', name: 'Nhân viên' },
  {
    _id: '659919a451a235a0f4b80700',
    name: 'Khách hàng'
  }
  // {
  //   _id: '659b79c6757ca91b82e2b9d0',
  //   name: 'Admin'
  // }
]

const Users = () => {
  const { userDetail } = useContext(ContextMain)
  const [showEdit, setShowEdit] = useState(false)
  const [confirmBlock, setConfirmBlock] = useState(false)
  const [confirmUnBlock, setConfirmUnBlock] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const [checkBlock, setCheckBlock] = useState(null)
  const [checkUnblockId, setCheckUnblockId] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5) // Số người dùng trên mỗi trang

  useEffect(() => {}, [selectedUserIndex, checkBlock, checkUnblockId])
  const { data: allUser } = useQuery({
    queryKey: ['USER'],
    queryFn: async () => {
      try {
        const { data } = await getUser()
        return data
      } catch (error) {
        throw new Error(error as string)
      }
    }
  }) // Log lại giá trị mỗi khi selectedUserIndex thay đổi
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage

  // Lấy mảng người dùng cho trang hiện tại
  const currentUsers = allUser?.response?.slice(
    indexOfFirstUser,
    indexOfLastUser
  )

  // Logic xử lý khi chuyển trang
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber)
  // Tính toán số trang
  const pageNumbers = []
  for (
    let i = 1;
    i <= Math.ceil(allUser?.response?.length / usersPerPage);
    i++
  ) {
    pageNumbers.push(i)
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage((pre) => pre + 1)
    }
  }

  const queryClient = useQueryClient()
  const userUpdateId = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await updateUserId(user, selectedUserIndex)
        if (result.status === 200) {
          queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

          toast.success('Cập nhật vai trò thành công !')
          // setTimeout(() =>{
          //   window.location.href="/blog"
          // },2000)
        }
        return result
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message

          toast.error(`Có lỗi xảy ra: ${errorMessage}`)
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      }
    }
  })

  const blockUser = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await block(user, checkBlock)
        if (result.status === 200) {
          queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

          toast.success('Người dùng đã bị chặn!')
          // setTimeout(() =>{
          //   window.location.href="/blog"
          // },2000)
        }
        return result
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message

          toast.error(`Có lỗi xảy ra: ${errorMessage}`)
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
        }
      }
    }
    // onSuccess: (data: any) => {
    //   // const { showtime } = data;
    //   queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

    //   toast.success('Block thành công <3')
    // }
  })
  const unBlockUser = useMutation({
    mutationFn: async (user: any) => {
      // const { showtime } = user;
      try {
        const result = await unblock(user, checkUnblockId)
        return result
      } catch (error) {
        throw new Error(error as string)
      }
    },
    onSuccess: () => {
      // const { showtime } = data;
      queryClient.invalidateQueries(['USER'] as InvalidateQueryFilters)

      toast.success('Bỏ block thành công')
    }
  })
  const toggleCheckBlock = (user: any) => {
    setConfirmBlock(true)
    setCheckBlock(user?._id)
  }
  const toggleCheckUnBlockId = (user: any) => {
    setConfirmUnBlock(true)
    setCheckUnblockId(user?._id)
  }

  const handleOptionChange = (event: any) => {
    setSelectedRole(event.target.value)
  }

  const toggleShowEdit = (user: any) => {
    setShowEdit(true)
    setSelectedUserIndex(user?._id)
  }

  const handleUpdateRole = (e: any) => {
    e.preventDefault()

    if (selectedUserIndex !== null && selectedUserIndex !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      userUpdateId.mutate({ id: selectedUserIndex, roleIds: selectedRole })

      // Đóng modal sau khi cập nhật
      setShowEdit(false)
      return
    }
  }
  const handleBlock = (e: any) => {
    e.preventDefault()

    if (checkBlock !== null && checkBlock !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      blockUser.mutate({ id: checkBlock, isBlocked: true })

      // Đóng modal sau khi cập nhật
      setConfirmBlock(false)
      return
    }
  }

  const handleUnBlock = (e: any) => {
    e.preventDefault()

    if (checkUnblockId !== null && checkUnblockId !== undefined) {
      // Thực hiện cập nhật vai trò cho người dùng với _id được chọn
      unBlockUser.mutate({ id: checkUnblockId, isBlocked: false })

      // Đóng modal sau khi cập nhật
      setConfirmUnBlock(false)
      return
    }
  }

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Người dùng"
        pageLink="/admin/users"
        pageRetun="Người dùng"
      />
      <div className="bg-white dark:bg-boxdark p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">
              Danh sách người dùng
            </h2>
            <span className="text-xs">Tất Cả người dùng</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8"></div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollable-table">
            <div className="inline-block  shadow rounded-lg overflow-hidden ">
              <table className="w-[1200px]  border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark">
                <thead>
                  <tr>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Số Điện Thoại
                    </th>
                    <th className="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider w-[600px]">
                      Địa Chỉ
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="w-[200px] py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className=" py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
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
                  {currentUsers?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={item?.avatar}
                              alt="Lỗi"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.mobile}
                        </p>
                      </td>
                      <td className=" border-b border-gray-200  text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.address}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {filterRole(item?.roleIds?.roleName)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200  text-sm">
                        {item?.status === 'Blocked' ? (
                          <span className="relative inline-block px-3 py-1 font-semibold  text-red-900 leading-tight w-full text-center ">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full "
                            ></span>
                            <span className="relative ">{item?.status}</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-2 font-semibold text-green-900 leading-tight w-full text-center ">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full "
                            ></span>
                            <span className="relative ">{item?.status}</span>
                          </span>
                        )}
                      </td>
                      {userDetail?.message?.roleIds == ROLE_ADMIN && (
                        <td className="px-3 py-5 border-b border-gray-200  text-sm ">
                          <div className="flex gap-4">
                            <button
                              className={`middle none center rounded-lg bg-blue-500 py-1 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all ${
                                item._id === userDetail?.message?._id
                                  ? 'disabled:opacity-50 disabled:pointer-events-none'
                                  : ''
                              }`}
                              data-ripple-light="true"
                              onClick={() => toggleShowEdit(item)}
                              disabled={item._id === userDetail?.message?._id}
                            >
                              <PencilLine size={18} />
                            </button>
                            {item?.status === 'Blocked' ? (
                              <button
                                className={`middle none center mr-4 rounded-lg bg-red-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                                  item._id === userDetail?.message?._id
                                    ? 'disabled:opacity-50 disabled:pointer-events-none'
                                    : ''
                                }`}
                                data-ripple-light="true"
                                onClick={() => toggleCheckUnBlockId(item)}
                                disabled={item._id === userDetail?.message?._id}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-lock-keyhole-open"
                                >
                                  <circle cx="12" cy="16" r="1" />
                                  <rect
                                    width="18"
                                    height="12"
                                    x="3"
                                    y="10"
                                    rx="2"
                                  />
                                  <path d="M7 10V7a5 5 0 0 1 9.33-2.5" />
                                </svg>
                              </button>
                            ) : (
                              <button
                                className={`middle none center mr-4 rounded-lg bg-red-500 py-2 px-3 font-sans text-xs font-bold uppercase flex justify-center text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full ${
                                  item._id === userDetail?.message?._id
                                    ? 'disabled:opacity-50 disabled:pointer-events-none'
                                    : ''
                                }`}
                                data-ripple-light="true"
                                onClick={() => toggleCheckBlock(item)}
                                disabled={item._id === userDetail?.message?._id}
                              >
                                <LockKeyhole size={18} />
                              </button>
                            )}
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
                  <li>
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
                  {pageNumbers.map((number) => (
                    <>
                      <li>
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

      {showEdit && (
        <>
          <div
            className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center  border border-black bg-opacity-50"
            style={{ boxShadow: '3px 2px 10px 1px #d1c8c8;' }}
          >
            <div
              className="bg-white  rounded  w-10/12 md:w-1/3  shadow-xl"
              style={{ boxShadow: '3px 2px 10px 1px #d1c8c8;' }}
            >
              <div className="border-b px-4 py-2 flex justify-center items-center text-center">
                <h3 className="font-semibold text-lg text-black ">
                  Cập nhật vai trò
                </h3>
              </div>
              <form onSubmit={handleUpdateRole}>
                <div className="p-3 justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 p-4 ">
                    {arrayRole.map((role) => {
                      return (
                        <label key={role._id}>
                          <input
                            type="radio"
                            value={role._id}
                            className="peer hidden"
                            name="roleIds"
                            checked={selectedRole === role._id}
                            onChange={handleOptionChange}
                          />

                          <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 dark:border-graydark border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                            <h2 className="font-medium text-gray-700 dark:text-black">
                              {role.name}
                            </h2>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className="flex justify-center items-center border-t p-3">
                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
                    onClick={() => setShowEdit(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {confirmBlock && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 h-screen">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Bạn có chắc muốn block người này
            </h1>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
              onClick={() => setConfirmBlock(false)}
            >
              Hủy
            </button>
            <button
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={handleBlock}
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}

      {confirmUnBlock && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 h-screen">
          <div className="bg-white px-16 py-14 rounded-md text-center">
            <h1 className="text-xl mb-4 font-bold text-slate-500">
              Bạn có chắc muốn mở block người này
            </h1>
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
              onClick={() => setConfirmUnBlock(false)}
            >
              Hủy
            </button>
            <button
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={handleUnBlock}
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  )
}

export default Users
