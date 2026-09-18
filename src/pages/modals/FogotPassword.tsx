import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/api/auth'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import ResetPassword from './ResetPassword'
interface FormValues {
  email: string
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  // const [passViewState, setPassViewState] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [showFormReset, setShowFormReset] = useState(false)

  // const togglePassState = (e: any) => {
  //   e.preventDefault()

  //   setPassViewState((prevState) => !prevState)
  // }
  // const showResetForm = () => {
  //   setShowFormReset(true)
  // }

  const forgotPass = useMutation({
    mutationFn: async (email: any) => await forgotPassword(email),
    onSuccess() {
      setLoading(false)
      toast.success('Gửi mã OTP thành công')
      setShowFormReset(true)
    },
    onError() {
      setLoading(false)

      toast.error('Gửi mã thất bại, kiểm tra lại  email')
    }
  })

  const formikValidate = useFormik({
    initialValues: {
      email: ''
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {}

      if (!values.email) {
        errors.email = 'Yêu cầu  email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Chưa nhập địa chỉ email'
      }

      return errors
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await forgotPass.mutateAsync(values)
      } catch (error:any) {
        throw new Error(error)
      }
    }
  })

  const handleLoginState = () => {
    setShowForm((prevShowForm) => !prevShowForm) // Cập nhật trạng thái để ẩn/hiển thị form
  }

  return (
    <div>
      {showForm && (
        <div className="login-form overlay">
          <form onSubmit={formikValidate.handleSubmit}>
            <div className="signup-form-heading">
              <h2 className="signup-form-heading-text">Quên mật khẩu?</h2>
              <button
                type="button"
                className="btn-form-exit"
                onClick={handleLoginState}
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

            {formikValidate.touched.email && formikValidate.errors.email && (
              <div className="text-red-500 text-xl font-bold">
                {formikValidate.errors.email}
              </div>
            )}
            <div className="signup-form-body">
              <div className="signup-form-category">
                <label>
                  Email: <span>*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formikValidate.values.email}
                  onChange={formikValidate.handleChange}
                  onBlur={formikValidate.handleBlur}
                  placeholder="Nhập  Email"
                />
              </div>

              <button type="submit" className="btn-reg bg-[#eb3656]">
                {loading ? 'Loading ...' : 'Gửi OTP về email'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showFormReset && <ResetPassword />}
    </div>
  )
}
export default ForgotPassword
