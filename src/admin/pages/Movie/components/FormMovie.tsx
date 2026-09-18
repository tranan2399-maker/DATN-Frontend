import { Category } from '@/admin/types/category'
import Loading from '@/admin/components/Loading/Loading'

import { Movie, FormMovieAdd } from '@/admin/types/movie'
import { getAllCategory } from '@/api/category'
import { addMovie, editMovie, getOneMovie } from '@/api/movie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { ChangeEventHandler, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css'
import { format } from 'date-fns'

type FormMovieProps = {
  typeForm: 'ADD' | 'EDIT'
}

const FormMovie = ({ typeForm }: FormMovieProps) => {
  // const [date, setDate] = useState(new Date())
  const navigate = useNavigate()
  const [, setfromDate] = useState(new Date())
  const [, settoDate] = useState(new Date())
  const [file, setFiles] = useState<File[]>([])

  //get id from url
  const { id } = useParams()

  // fetch category by react-query
  const {
    data: datacate,
    isLoading: isLoadingCategory,
    isError: iserrCategory
  } = useQuery<Category[]>({
    queryKey: ['CATEGORY'],
    queryFn: getAllCategory
  })

  const { data: movieData, isLoading } = useQuery<Movie>({
    queryKey: ['MOVIE', id],
    queryFn: async () => {
      const data = await getOneMovie(id as string)

      // pricesId = data.prices
      const priceMovie =
        data &&
        data?.prices.find((price: any) => {
          return price.dayType == 'weekday'
        })

      setFieldValue('name', data?.name)
      setFieldValue('image', data?.image)
      setFieldValue('author', data?.author)
      setFieldValue('language', data?.language)
      setFieldValue('actor', data?.actor)
      setFieldValue('trailer', data?.trailer)
      setFieldValue('fromDate', data?.fromDate)
      setFieldValue('toDate', data?.toDate)
      setFieldValue('desc', data?.desc)
      setFieldValue('image', data?.image)
      setFieldValue('country', data?.country)
      setFieldValue('duration', data?.duration)
      setFieldValue('status', data?.status)
      setFieldValue('age_limit', data?.age_limit)
      setFieldValue('rate', data?.rate)
      setFieldValue('showTimes', data?.showTimes)
      setFieldValue('prices', priceMovie.price)
      setFieldValue(
        'categoryId',
        data?.categoryCol.map((c: any) => c._id)
      )
      setFieldTouched('categoryId', true)
      return data
    },

    enabled: typeForm === 'EDIT' && !!id,
    refetchOnWindowFocus: false
  })

  // mutation react-query
  const { mutate, isPending } = useMutation({
    mutationFn: async (bodyData: FormMovieAdd) => {
      if (typeForm === 'EDIT') {
        return editMovie(bodyData, id as string)
      }

      return addMovie(bodyData)
    },
    onSuccess: () => {
      if (typeForm === 'EDIT') {
        toast.success('Sửa phim thành công')

        return
      }
      toast.success('Thêm phim thành công')
      navigate('/admin/movie')
    },
    onError: (error: { response: { data: { message: string } } }) => {
      if (typeForm === 'EDIT') {
        toast.error('Sửa phim thất bại')
        return
      }

      toast.error(`${error.response.data.message}`)
    }
  })

  const initialValues = {
    name: id ? (movieData?.name as string) : '',
    image: id ? (movieData?.image as string) : '',
    author: id ? (movieData?.author as string) : '',
    language: id ? (movieData?.language as string) : '',
    actor: id ? (movieData?.actor as string) : '',
    trailer: id ? (movieData?.trailer as string) : '',
    // fromDate: id ? (movieData?.fromDate as unknown as string) : '',
    // toDate: id ? (movieData?.toDate as unknown as string) : '',
    desc: id ? (movieData?.desc as string) : '',
    country: id ? (movieData?.country as string) : '',
    status: id ? (movieData?.status as string) : '',
    duration: id ? (movieData?.duration as number | undefined) : undefined,
    age_limit: id ? (movieData?.age_limit as number | undefined) : undefined,
    rate: id ? (movieData?.rate as number | undefined) : undefined,
    categoryId: id ? (movieData?.categoryId as string[]) : [],
    showTimes: id ? (movieData?.showTimes as string[]) : '',
    price: movieData ? movieData.prices[0].price : 0
  }
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<any> = {}
      if (!values.name) {
        errors.name = 'Tên bắt buộc'
      } else if (values.name.length < 3) {
        errors.name = 'Tên phải dài ít nhất 3 ký tự'
      }
      if (!id) {
        if (!file[0]) {
          errors.image = 'Hình ảnh bắt buộc'
        }
      }
      if (!values.author) {
        errors.author = 'tác giả bắt buộc'
      } else if (values.author.length < 3) {
        errors.author = 'tác giả phải dài ít nhất 3 ký tự'
      }
      if (!values.language) {
        errors.language = 'Ngôn ngữ bắt buộc'
      } else if (values.language.length < 3) {
        errors.language = 'ngôn ngữ phải dài ít nhất 3 ký tự'
      }
      if (!values.desc) {
        errors.desc = 'Mô tả bắt buộc'
      } else if (values.desc.length < 3) {
        errors.desc = 'Mô tả phải dài ít nhất 3 ký tự'
      }
      if (!values.actor) {
        errors.actor = 'Diễn viên bắt buộc'
      } else if (values.actor.length < 3) {
        errors.actor = 'diễn viên phải dài ít nhất 3 ký tự'
      }
      if (!values.trailer) {
        errors.trailer = 'Đoạn giới thiệu bắt buộc'
      } else if (values.trailer.length < 3) {
        errors.trailer = 'đoạn giới thiệu phải dài ít nhất 3 ký tự'
      }
      // // Kiểm tra nếu fromDate không hợp lệ
      if (!values.fromDate) {
        errors.fromDate = 'Dữ liệu bắt buộc nhập'
      }

      // // Kiểm tra nếu toDate không hợp lệ
      if (!values.toDate) {
        errors.toDate = 'Dữ liệu bắt buộc nhập'
      }
      if (!values.country) {
        errors.country = 'Quốc gia bắt buộc'
      } else if (values.country.length < 3) {
        errors.country = 'quốc gia phải dài ít nhất 3 ký tự'
      }
      if (!values.duration) {
        errors.duration = 'Thời lượng bắt buộc'
      } else if (isNaN(values.duration) || Number(values.duration) <= 30) {
        errors.duration = 'Thời lượng phải là một số và lớn hơn 30'
      }
      if (!values.age_limit) {
        errors.age_limit = 'Yêu cầu độ tuổi_giới hạn'
      } else if (isNaN(values.age_limit) || Number(values.age_limit) <= 0) {
        errors.age_limit = 'Giới hạn tuổi phải là một số và lớn hơn 0'
      }
      // if (!values.rate) {
      //   errors.rate = 'Tỷ lệ bắt buộc'
      // } else if (
      //   isNaN(values.rate) ||
      //   (Number(values.rate) <= 0 && Number(values.rate) <= 1)
      // )
      if (!values.prices) {
        errors.prices = 'Bắt buộc nhập giá'
      } else if (isNaN(values.prices) || Number(values.prices) <= 0) {
        errors.prices = 'Giá phải là một số và lớn hơn 0'
      }
      if (!values.status) {
        errors.status = 'trạng thái bắt buộc'
      } else if (values.status.length < 3) {
        errors.status = 'trạng thái phải dài ít nhất 3 ký tự'
      }
      if (!values.categoryId) {
        // errors.categoryId = 'Id danh mục bắt buộc'
      } else if (values.categoryId.length < 1 || values.categoryId.length > 3) {
        errors.categoryId = 'Danh mục phải từ 1 đến 3 loại'
      }

      return errors
    },
    onSubmit: async (values: any) => {
      try {
        // chuyển đồi fromDat and toDate
        const data = new FormData()
        data.set('name', values?.name)
        data.set('image', file[0] ? file[0] : movieData?.image || '')
        data.set('author', values?.author)
        data.set('actor', values?.actor)
        data.set('language', values?.language)
        data.set('trailer', values?.trailer)
        data.set('age_limit', values?.age_limit)

        data.set('fromDate', values?.fromDate)
        data.set('toDate', values?.toDate)

        data.set('desc', values?.desc)
        data.set('duration', values?.duration)
        data.set('country', values?.country)
        data.set('status', values?.status)
        if (values?.rate == undefined) {
          values.rate = 5
        }
        data.set('rate', values?.rate)
        // data.set('price', values?.price)
        // data.set('toDate', values?.toDate)
        // data.set('fromDate', values?.fromDate)
        const priceObj: any = [
          {
            dayType: 'weekday',
            price: values?.prices
          },
          {
            dayType: 'weekend',
            price: values?.prices * 1.5
          }
        ]

        for (let i = 0; i < values.categoryId.length; i++) {
          data.append('categoryId[]', values.categoryId[i])
        }
        data.append('prices[]', JSON.stringify(priceObj))
        await mutate(data as any)
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })
  if (isLoading && isLoadingCategory) return <Loading />
  if (iserrCategory) {
    return <div>Error</div>
  }
  // select style
  const colourOptions = datacate?.map((cate) => ({
    value: cate._id,
    label: cate.name
  }))
  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value)
    handleChange({
      target: { name: 'categoryId', value: selectedValues }
    })
  }
  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    const filesTarget = target.files
    if (filesTarget) {
      const filesArray = Array.from(filesTarget)
      setFiles(filesArray)
    }
  }
  const selectedOptions = colourOptions?.filter((option: any) =>
    values.categoryId?.includes(option.value)
  )

  // select style
  const dropdownStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e0'
      },
      '&:focus': {
        borderColor: '#63b3ed',
        boxShadow: '0 0 0 2px rgba(99, 179, 237, 0.2)'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#edf2f7' : 'white',
      color: state.isSelected ? '#2d3748' : '#4a5568',
      '&:hover': {
        backgroundColor: state.isSelected ? '#edf2f7' : '#f7fafc',
        color: state.isSelected ? '#2d3748' : '#4a5568'
      }
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#e2e8f0',
      borderRadius: '9999px'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#2d3748'
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#718096',
      '&:hover': {
        color: '#4a5568'
      }
    })
  }

  return (
    <div className="">
      {isPending ? (
        <Loading />
      ) : (
        <div className="border rounded bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            autoComplete="false"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-6 space-y-6"
          >
            {/* <div className="p-6.5 flex"> */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="mb-4.5 gap-6 w-full">
                {/* name */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Tên Phim
                  </label>
                  <input
                    autoComplete="off"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder=" Nhập tên phim ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />

                  {touched.name && errors.name && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.name as any}
                    </div>
                  )}
                </div>
                {/* actor */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Diễn viên
                  </label>
                  <input
                    autoComplete="off"
                    name="actor"
                    value={values.actor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập tên diễn viên ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />

                  {touched.actor && errors.actor && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.actor as any}
                    </div>
                  )}
                </div>
                {/* author */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Tác giả
                  </label>
                  <input
                    autoComplete="off"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập tên tác giả ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />

                  {touched.author && errors.author && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.author as any}
                    </div>
                  )}
                </div>
                {/* language */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Ngôn Ngữ
                  </label>
                  <select
                    name="language"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.language}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  >
                    <option value="">Chọn ngôn ngữ</option>
                    <option value="Vietnam">Việt Nam</option>
                    <option value="China">Trung Quốc</option>
                    <option value="United States">Hoa Kỳ</option>
                    <option value="United Kingdom">Anh</option>
                    <option value="Russia">Nga</option>
                    <option value="France">Pháp</option>
                    <option value="Germany">Đức</option>
                    <option value="Italy">Ý</option>
                    <option value="Spain">Tây Ban Nha</option>
                    <option value="Japan">Nhật Bản</option>
                    <option value="South Korea">Hàn Quốc</option>
                    <option value="India">Ấn Độ</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Úc</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Thailand">Thái Lan</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Sweden">Thụy Điển</option>
                    <option value="Netherlands">Hà Lan</option>
                    <option value="Switzerland">Thụy Sĩ</option>
                    <option value="Belgium">Bỉ</option>
                    <option value="Norway">Na Uy</option>
                    <option value="Finland">Phần Lan</option>
                    <option value="Poland">Ba Lan</option>
                    <option value="Denmark">Đan Mạch</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Portugal">Bồ Đào Nha</option>
                    <option value="Austria">Áo</option>
                    <option value="Greece">Hy Lạp</option>
                    <option value="Czech Republic">Séc</option>
                    <option value="Hungary">Hungary</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Chile">Chile</option>
                    <option value="Peru">Peru</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Romania">România</option>
                    <option value="Bulgaria">Bulgary</option>
                    <option value="Cuba">Cuba</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">Nam Phi</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Iran">Iran</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="Turkey">Turkey</option>
                    <option value="Israel">Israel</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Syria">Syria</option>
                    <option value="Yemen">Yemen</option>
                  </select>
                  {/* <input
                    autoComplete="off"
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập ngôn ngữ ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  /> */}

                  {touched.language && errors.language && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.language as any}
                    </div>
                  )}
                </div>
                {/* trailer */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Đoạn phim giới thiệu
                  </label>
                  <input
                    autoComplete="off"
                    name="trailer"
                    value={values.trailer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập trailer ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />

                  {touched.trailer && errors.trailer && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.trailer as any}
                    </div>
                  )}
                </div>
                {/* age_limit */}
                {/* <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Giới hạn tuổi
                  </label>
                  <input
                  autoComplete='off'
                  
                    name="age_limit"
                    value={values.age_limit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập giới hạn tuổi ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />

                  {touched.age_limit && errors.age_limit && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.age_limit as any}
                    </div>
                  )}
                </div> */}
                {/* desc */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Mô tả
                  </label>

                  <textarea
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    name="desc"
                    value={values.desc}
                    placeholder="Nhập Mô tả ..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {touched.desc && errors.desc && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.desc as any}
                    </div>
                  )}
                </div>
                {/* country */}
                {/* rate */}
                <div className=" relative z-0 mb-6 w-full group hidden">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Rate
                  </label>
                  <input
                    autoComplete="off"
                    name="rate"
                    // value={ values.rate}
                    value={values.rate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Nhập rate ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />
                  {touched.rate && errors.rate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.rate as any}
                    </div>
                  )}
                </div>
                {/*  */}
              </div>
              {/* box2 */}
              <div className="lg:p-2 mb-4.5 lg:ml-8  flex-col gap-6 xl:flex-row">
                {/* category */}
                <div className="form-group">
                  <label className="block mb-2 font-medium text-primary dark:text-yellow-400">
                    Danh mục:
                  </label>
                  <Select
                    name="categoryId"
                    closeMenuOnSelect={false}
                    defaultValue={colourOptions?.filter((option) =>
                      initialValues?.categoryId?.includes(option.value)
                    )}
                    isMulti
                    options={colourOptions}
                    value={selectedOptions}
                    onChange={handleSelectChange}
                    onBlur={handleBlur}
                    styles={dropdownStyles}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />
                  {touched.categoryId && errors.categoryId && (
                    <div className="text-red-500 text-sm font-bold mt-1">
                      {errors.categoryId as any}
                    </div>
                  )}
                </div>
                {/* box gruop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-3">
                  {/* age_limit */}
                  <div className="relative z-0 group">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                      Giới hạn tuổi
                    </label>
                    <input
                      autoComplete="off"
                      name="age_limit"
                      value={values.age_limit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Nhập giới hạn tuổi ..."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    />
                    {touched.age_limit && errors.age_limit && (
                      <div className="mt-1 text-red-500 text-sm font-bold">
                        {errors.age_limit as any}
                      </div>
                    )}
                  </div>
                  {/* duration */}
                  <div className="relative z-0 group">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                      Thời lượng phim
                    </label>
                    <input
                      autoComplete="off"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      placeholder="Nhập thời lượng phim ..."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    />
                    {touched.duration && errors.duration && (
                      <div className="mt-1 text-red-500 text-sm font-bold">
                        {errors.duration as any}
                      </div>
                    )}
                  </div>
                  {/* country */}
                </div>
                <div className="relative z-0 group mt-2">
                  <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                    Quốc gia
                  </label>
                  <select
                    name="country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.country}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  >
                    <option value="">Chọn quốc gia</option>
                    <option value="Vietnam">Việt Nam</option>
                    <option value="China">Trung Quốc</option>
                    <option value="United States">Hoa Kỳ</option>
                    <option value="United Kingdom">Anh</option>
                    <option value="Russia">Nga</option>
                    <option value="France">Pháp</option>
                    <option value="Germany">Đức</option>
                    <option value="Italy">Ý</option>
                    <option value="Spain">Tây Ban Nha</option>
                    <option value="Japan">Nhật Bản</option>
                    <option value="South Korea">Hàn Quốc</option>
                    <option value="India">Ấn Độ</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Úc</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Thailand">Thái Lan</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Sweden">Thụy Điển</option>
                    <option value="Netherlands">Hà Lan</option>
                    <option value="Switzerland">Thụy Sĩ</option>
                    <option value="Belgium">Bỉ</option>
                    <option value="Norway">Na Uy</option>
                    <option value="Finland">Phần Lan</option>
                    <option value="Poland">Ba Lan</option>
                    <option value="Denmark">Đan Mạch</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Portugal">Bồ Đào Nha</option>
                    <option value="Austria">Áo</option>
                    <option value="Greece">Hy Lạp</option>
                    <option value="Czech Republic">Séc</option>
                    <option value="Hungary">Hungary</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Chile">Chile</option>
                    <option value="Peru">Peru</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Romania">România</option>
                    <option value="Bulgaria">Bulgary</option>
                    <option value="Cuba">Cuba</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="South Africa">Nam Phi</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Iran">Iran</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="Turkey">Turkey</option>
                    <option value="Israel">Israel</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Syria">Syria</option>
                    <option value="Yemen">Yemen</option>
                  </select>

                  {/* <input
                      autoComplete="off"
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Nhập quốc gia ..."
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    /> */}
                  {touched.country && errors.country && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.country as any}
                    </div>
                  )}
                </div>
                {/* image */}
                <div className=" relative z-0 mb-6 w-full group mt-3">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Ảnh Phim
                  </label>
                  <input
                    autoComplete="off"
                    name="image"
                    onChange={handleChangeFile}
                    onBlur={handleBlur}
                    type="file"
                    placeholder="Nhập URL ảnh ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />
                  {touched.image && errors.image && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.image as any}
                    </div>
                  )}
                  {values.image && (
                    <img
                      src={values.image}
                      alt="movie"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                {/* fromDate */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Từ ngày
                  </label>
                  <Flatpickr
                    name="fromDate"
                    defaultValue={initialValues?.toDate || ''}
                    value={values?.fromDate || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        )
                        setfromDate(selectedDates[0])
                        setFieldValue('fromDate', formattedDate)
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    id="grid-last-time"
                    type="text"
                  />
                  {touched.fromDate && errors.fromDate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.fromDate as any}
                    </div>
                  )}
                </div>
                {/* todate */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Đến ngày
                  </label>
                  <Flatpickr
                    name="toDate"
                    defaultValue={values?.toDate || ''}
                    value={values?.toDate || ''}
                    options={{
                      dateFormat: 'd-m-Y H:i',
                      enableTime: true,
                      onChange: (selectedDates) => {
                        const formattedDate = format(
                          selectedDates[0],
                          'dd-MM-yyyy HH:mm'
                        ) // Định dạng lại ngày giờ
                        settoDate(selectedDates[0])
                        setFieldValue('toDate', formattedDate)
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                    id="grid-last-time"
                    type="text"
                  />
                  {touched.toDate && errors.toDate && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.toDate as any}
                    </div>
                  )}
                </div>
                {/* prices */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Giá phim:
                  </label>
                  <input
                    autoComplete="off"
                    name="prices"
                    value={values?.prices}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Nhập giá  ..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />
                  {touched.price && errors.price && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.price as any}
                    </div>
                  )}
                </div>
                {/* status */}
                <div className=" relative z-0 mb-6 w-full group">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Trạng thái:
                  </label>
                  <div className="inline-block relative w-full">
                    <select
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                      id="multiSelect"
                      name="status"
                      // value={selectedState}
                      // onChange={ }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option className="text-gray-900" value="">
                        -- Chọn trạng thái --
                      </option>
                      <option
                        className="text-gray-900"
                        value="COMING_SOON"
                        selected={values.status === 'COMING_SOON'}
                      >
                        Sắp Công Chiếu
                      </option>
                      <option
                        className="text-gray-900"
                        value="IS_SHOWING"
                        selected={values.status === 'IS_SHOWING'}
                        disabled={!id}
                      >
                        Đang Công Chiếu
                      </option>
                      <option
                        className="text-gray-900"
                        value="PRTMIERED"
                        selected={values.status === 'PRTMIERED'}
                        disabled={!id}
                      >
                        Đã Công Chiếu
                      </option>
                      <option
                        className="text-gray-900"
                        value="CANCELLED"
                        selected={values.status === 'CANCELLED'}
                        disabled={!id}
                      >
                        Đã Hủy
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
                  {touched.status && errors.status && (
                    <div className="mt-1 text-red-500 text-sm font-bold">
                      {errors.status as any}
                    </div>
                  )}
                </div>
                {/*  */}
              </div>
              {/*  */}
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-50 transition duration-300 mt-4"
              type="submit"
            >
              {typeForm === 'ADD' ? 'Thêm' : 'Cập nhật'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FormMovie
