import Loader from '@/admin/common/Loader'
import { editRooms, getOneRooms, newRooms } from '@/api/screeningrooms'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormRoomsProps = {
  typeForm: 'ADD' | 'EDIT'
}
const FormRooms = ({ typeForm }: FormRoomsProps) => {
  // const _id='65d30a80a047aeebd3c78c72';
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // const handleBack = () => {
  //   navigate(-1)
  // }
  // const handleBack = () => {
  //   navigate(-1)
  // }
  const { id } = useParams()
  const { data: roomsData, isLoading } = useQuery({
    queryKey: ['ROOMS', id],
    queryFn: async () => {
      const data = await getOneRooms(id as string)
      setFieldValue('name', data?.name)
      setFieldValue('NumberSeat', data?.NumberSeat)
      setFieldValue('projector', data?.projector)

      return data
    },
    enabled: typeForm === 'EDIT' && !!id
  })
  const { mutate } = useMutation({
    mutationFn: async (bodyData: {
      name: string
      projector: string
      NumberSeat: number
    }) => {
      if (typeForm === 'EDIT') return editRooms(bodyData, id as string)
      return newRooms(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Chỉnh sửa phòng thành công')
        queryClient.invalidateQueries({
          queryKey : ['ROOMS']
        })
        navigate('/admin/screeningrooms')
        return
      }
      toast.success('Thêm phòng thành công')
      queryClient.invalidateQueries({
        queryKey : ['ROOMS']
      })
      navigate('/admin/screeningrooms')
    },
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Chỉnh sửa phòng không thành công')
        return
      }
      toast.error('Thêm phòng thất bại')
    }
  })

  const {
    values,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur
  } = useFormik({
    initialValues: {
      name: id ? (roomsData?.name as string) : '',
      NumberSeat: id ? roomsData?.NumberSeat : undefined,
      projector: id ? (roomsData?.projector as string) : ''
    },
    validate: (values) => {
      const errors: Partial<any> = {}
      if (!values.name) {
        errors.name = 'Tên phòng bắt buộc'
      }
      if (!values.projector) {
        errors.projector = 'Tên máy chiếu bắt buộc'
      }
      // if (!values.NumberSeat) {
      // errors.NumberSeat="Bắt buộc phải nhập"
      // }

      return errors
    },
    onSubmit: async (values) => {
      try {
        const bodyData = {
          name: values.name,
          NumberSeat: parseInt(values.NumberSeat!) || 0,
          projector: values.projector
        }
        if (typeForm === 'EDIT' && roomsData.ShowtimesId.length > 0) {
          toast.error('Phòng chiếu đã có lịch chiếu', {
            position: 'top-right'
          })
          return
        }
        mutate(bodyData)
      } catch (error) {
        throw new Error(error as string)
      }

      // Sử dụng formData thay vì values JSON
      // Sử dụng formData thay vì values JSON
    }
  })

  if (isLoading) return <Loader />
  return (
    <div className="flex flex-col gap-9 items-center justify-center p-8">
      {/* <button
        onClick={handleBack}
        className="self-start mb-4 flex items-center text-lg text-gray-700 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Trở lại
      </button> */}
      <div className="max-w-lg w-full rounded-lg shadow-md overflow-hidden dark:bg-boxdark">
        <form
          onSubmit={handleSubmit}
          className=" dark:bg-gray-800 p-6"
          encType="multipart/form-data"
        >
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
              Tên Phòng
            </label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Nhập tên phòng"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
            />
            {touched.name && errors.name && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </div>
            )}
          </div>

          {/*  projector */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
              Máy chiếu
            </label>
            <div className="inline-block relative w-full">
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                id="multiSelect"
                name="projector"
                // value={selectedState}
                // onChange={ }
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option className="text-gray-900" value="">
                  -- Chọn Máy chiếu --
                </option>
                <option
                  className="text-gray-900"
                  value="Projector_1"
                  selected={values.projector === 'Projector_1'}
                >
                  Máy Chiếu 1
                </option>
                <option
                  className="text-gray-900"
                  value="Projector_2"
                  selected={values.projector === 'Projector_2'}
                >
                  Máy chiếu 2
                </option>
                <option
                  className="text-gray-900"
                  value="Projector_3"
                  selected={values.projector === 'Projector_3'}
                >
                  Máy chiếu 3
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
            </div>
            {/* {touched.name && errors.name && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </div>
            )} */}
          </div>

          {/* status */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-gray-700 dark:text-gray-200">
              Số ghế
            </label>
            <div className="inline-block relative w-full">
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                id="multiSelect"
                name="NumberSeat"
                // value={'49'}
                // onChange={ }
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option className="text-gray-900" value="">
                  -- Chọn ghế --
                </option>
                <option
                  className="text-gray-900"
                  value={56}
                  selected={values.NumberSeat === 56}
                >
                  56
                </option>
                <option
                  className="text-gray-900"
                  value={64}
                  selected={values.NumberSeat === 64}
                >
                  64
                </option>
                <option
                  className="text-gray-900"
                  value={72}
                  selected={values.NumberSeat === 72}
                >
                  72
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
            </div>
            {/* {touched.name && errors.name && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </div>
            )} */}
          </div>

          <button
            className="w-full flex justify-center items-center rounded-md bg-indigo-600 py-3 px-6 text-xl font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition-colors duration-300"
            type="submit"
          >
            {typeForm === 'ADD' ? 'Thêm phòng chiếu' : 'Cập nhật phòng chiếu'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormRooms
