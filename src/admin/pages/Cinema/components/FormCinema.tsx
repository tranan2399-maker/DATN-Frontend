import { Cinema, FormCinemaAdd } from '@/admin/types/cenima'
import { addCinema, editCinema, getOneCinema } from '@/api/cinema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormCinemaProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormCinema = ({ typeForm }: FormCinemaProps) => {
  //get id from url
  const { id } = useParams()

  //get category by id
  const { data: CinemaData, isLoading } = useQuery<Cinema>({
    queryKey: ['CINEMA', id],
    queryFn: async () => {
      const data = await getOneCinema(id as string)

      setFieldValue('CinemaName', data?.CinemaName)
      setFieldValue('CinemaAdress', data?.CinemaAdress)
      // setFieldValue('ScreeningRoomId', data?.ScreeningRoomId)
      return data
    },
    enabled: typeForm === 'EDIT' && !!id
  })

  // mutation react-query
  const { mutate } = useMutation({
    mutationFn: async (bodyData: FormCinemaAdd) => {
      if (typeForm === 'EDIT') return editCinema(bodyData, id as string)
      return addCinema(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Sua rạp chiếu thành công')

        return
      }
      toast.success('Them cinema thanh cong')
    },
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Sua cinema that bai')
        return
      }
      toast.error('Them cinema that bai')
    }
  })

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: {
      CinemaName: id ? (CinemaData?.CinemaName as string) : '',
      CinemaAdress: id ? (CinemaData?.CinemaAdress as string) : '',
      ScreeningRoomId: id ? (CinemaData?.ScreeningRoomId as string[]) : ''
    },
    validate: (values) => {
      const errors: Partial<FormCinemaAdd> = {}
      if (!values.CinemaName) {
        errors.CinemaName = 'Required CinemaName'
      }
      if (!values.CinemaAdress) {
        errors.CinemaAdress = 'Required CinemaAdress'
      }

      return errors
    },
    onSubmit: async (values) => {
      // return
      try {
        const bodyData = {
          CinemaName: values?.CinemaName,
          CinemaAdress: values?.CinemaAdress
        }
        mutate(bodyData)
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">Tên rạp chiếu</label>
                <input
                  name="CinemaName"
                  value={values.CinemaName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter cinema name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                />
                {touched.CinemaName && errors.CinemaName && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.CinemaName}
                  </div>
                )}
              </div>
              {/*  */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Địa chỉ rạp chiếu
                </label>
                <input
                  name="CinemaAdress"
                  value={values.CinemaAdress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Enter cinema address"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                />
                {touched.CinemaAdress && errors.CinemaAdress && (
                  <div className="text-red-500 text-xl font-bold">
                    {errors.CinemaAdress}
                  </div>
                )}
              </div>

              {/*  */}
            </div>
            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
              type="submit"
            >
              {typeForm === 'ADD' ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormCinema
