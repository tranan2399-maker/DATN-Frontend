import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BarLoader from 'react-spinners/BarLoader'
import { signup } from '@/api/auth'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export const SignupModal = () => {
  const [loading] = useState(false)
  const [passViewState, setPassViewState] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [files] = useState<File[]>([])

  const handleShowForm = () => {
    setShowForm((prevShowForm) => !prevShowForm) // Cập nhật trạng thái để ẩn/hiển thị form
  }

  const CreateUser = useMutation({
    mutationFn: async (user: any) => await signup(user),
    onSuccess() {
      toast.success('Đăng ký thành công', {
        position: 'top-right'
      })
    },
    onError() {
      toast.error('Đăng ký thất bại, kiểm tra lại thông tin của bạn')
    }
  })

  const formikValidate = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validate: (values) => {
      const errors: Partial<FormValues> = {}

      if (!values.name || values.name.length <= 6) {
        errors.name = 'Phải chứa ít nhất 6 ký tự '
      }

      if (!values.email) {
        errors.email = 'Yêu cầu  email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Yêu cầu  email'
      }
      if (!values.password) {
        errors.password = 'Yêu cầu mật khẩu'
      } else if (values.password.length < 8) {
        errors.password = 'Mặt khẩu phải trên 8 ký tự'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Bắt buộc phải nhập lại mật khẩu'
      } else if (values.confirmPassword.length < 6) {
        errors.confirmPassword = 'Nhập lại mật khẩu phải lớn hơn 6 ký tự'
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Mật khẩu  không khớp, thử nhập lại'
      }

      return errors
    },
    onSubmit: async (values) => {
      const data = new FormData()
      data.set('name', values.name)
      data.set('email', values.email)
      data.set('password', values.password)
      // data.set('mobile', values.mobile)
      // data.set('address', values.address)
      data.set('confirmPassword', values.confirmPassword)

      if (files.length > 0) {
        data.set('avatar', files[0])
      } else {
        data.set(
          'avatar',
          'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg'
        ) // hoặc giá trị mặc định khác tùy thuộc vào logic của bạn
      }

      try {
        await CreateUser.mutateAsync(data)
        setShowForm(false)
        resetFormik()
      } catch (error: any) {
        throw new Error(error)
      }
    }
  })
  const togglePassState = (e: any) => {
    e.preventDefault()
    setPassViewState((prevState) => !prevState)
  }

  const resetFormik = () => {
    formikValidate.resetForm({
      values: {
        name: '',
        email: '',

        password: '',
        confirmPassword: ''
      }
    })
  }

  return (
    <div>
      {showForm && (
        <div className="signup-form2  overflow-y-hidden  mt-20">
          <div
            className=" hide-scroll-bar  "
            style={{ borderRadius: 'inherit' }}
          >
            <form
              onSubmit={formikValidate.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="signup-form-heading">
                <h2 className="signup-form-heading-text">
                  Tạo tài khoản DREAM CINEMA
                </h2>
                <button
                  type="button"
                  className="btn-form-exit"
                  onClick={handleShowForm}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="form-icon"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M368 368L144 144M368 144L144 368"
                    />
                  </svg>
                </button>
              </div>

              <div className="signup-form-body">
                <div className="signup-form-category-sp">
                  <div className="signup-form-category w-full ">
                    <label>
                      Tên : <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên  "
                      defaultValue={formikValidate.values.name}
                      onChange={formikValidate.handleChange}
                      onBlur={formikValidate.handleBlur}
                      name="name"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {formikValidate.touched.name &&
                    formikValidate.errors.name && (
                      <span className="text-red-500 text-base">
                        {formikValidate.errors.name}
                      </span>
                    )}
                </div>

                <div className="signup-form-category">
                  <label>
                    Email: <span>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Nhập  Email "
                    defaultValue={formikValidate.values.email}
                    onChange={formikValidate.handleChange}
                    onBlur={formikValidate.handleBlur}
                  />
                </div>
                {formikValidate.touched.email &&
                  formikValidate.errors.email && (
                    <div className="text-red-500 text-base">
                      {formikValidate.errors.email}
                    </div>
                  )}

                <div className="signup-form-category">
                  <label>
                    Mật khẩu (Phải chứa ít nhất 8 chữ số): <span>*</span>
                  </label>
                  <div className="input-password">
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      defaultValue={formikValidate.values.password}
                      onChange={formikValidate.handleChange}
                      onBlur={formikValidate.handleBlur}
                      name="password"
                    />
                    <button
                      type="button"
                      className="pass-icon-btn"
                      onClick={(e) => togglePassState(e)}
                    >
                      {passViewState ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pass-icon"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                          <circle
                            cx="256"
                            cy="256"
                            r="80"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="32"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pass-icon"
                          viewBox="0 0 512 512"
                        >
                          <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" />
                          <path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {formikValidate.touched.password &&
                  formikValidate.errors.password && (
                    <div className="text-red-500 text-base">
                      {formikValidate.errors.password}
                    </div>
                  )}

                <div className="signup-form-category">
                  <label>
                    Xác nhận mật khẩu(Phải chứa ít nhất 8 chữ số) :{' '}
                    <span>*</span>
                  </label>
                  <div className="input-password">
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      defaultValue={formikValidate.values.confirmPassword}
                      onChange={formikValidate.handleChange}
                      onBlur={formikValidate.handleBlur}
                      name="confirmPassword"
                    />
                    <button
                      type="button"
                      className="pass-icon-btn"
                      onClick={(e) => togglePassState(e)}
                    >
                      {passViewState ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pass-icon"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                          <circle
                            cx="256"
                            cy="256"
                            r="80"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="32"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="pass-icon"
                          viewBox="0 0 512 512"
                        >
                          <path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" />
                          <path d="M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {formikValidate.touched.confirmPassword &&
                  formikValidate.errors.confirmPassword && (
                    <div className="text-red-500 text-base">
                      {formikValidate.errors.confirmPassword}
                    </div>
                  )}

                <button
                  type="submit"
                  className="btn-reg bg-[#eb3656]"
                  disabled={loading}
                >
                  {loading ? <BarLoader color="#e6e6e8" /> : 'Đăng ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
