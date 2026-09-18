import { Cinema } from '@/admin/types/cenima'
import { getAllCinema } from '@/api/cinema'
import { ContextMain } from '@/context/Context'
import { ROLE_ADMIN } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const TableCinema = () => {
  const navigate = useNavigate()
  const { userDetail } = useContext(ContextMain)
  // fetch category by react-query
  const { data, isLoading, isError } = useQuery<Cinema[]>({
    queryKey: ['CINEMA'],
    queryFn: getAllCinema
  })

  // delete category by mutation react-query

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  // render
  return (
    <>
      <div className="text-center mb-2 flex items-center justify-start"></div>
      <div className="rounded-sm border border-stroke bg-primary px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Tên rạp chiếu
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-primary-white">
                  Địa chỉ rạp chiếu
                </th>
                {userDetail?.message?.roleIds == ROLE_ADMIN && (
                  <th className="py-4 px-4 font-medium text-primary-white">
                    Hành động
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((cate, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.CinemaName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-primary-white">{cate.CinemaAdress}</p>
                  </td>

                  {userDetail?.message?.roleIds == ROLE_ADMIN && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            navigate(`/admin/cinema/edit/${cate._id}`)
                          }}
                        >
                          <FaEdit size={20} />
                        </button>
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

export default TableCinema
