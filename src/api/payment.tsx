import axios from 'axios'
import instance from './config'

const API_SHEET =
  'https://script.googleusercontent.com/macros/echo?user_content_key=MIPMauBnYCSMc61fTmreKhnTEBo65Qpw8wWZ3eYEfLh4JVcOv9hRY5hI8J1rooBsmDYm_R5GELhaqASUgU1vevItRDgsx3Ffm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJDYxeDWDoc90muARYqJQNyi9ht6n3na3Xql5nIG5uuq4FW7PFzvewlna3Acgz5mYH9tHguWcvynvNXjTzMos-Qk-VV0VvVFFw&lib=MyP6QGkmCwXXt8xZrEaHgNls6V9Ni9i4a'

export interface PaymentApi {
  amount: number
  bankCode: string
  language: string
}
export const checkPaymentMBBank = async (
  total: number | undefined,
  content: string
) => {
  try {
    const result = await axios.get(API_SHEET)
    const currentPayment = result.data.data[result.data.data.length - 1]

    if (
      currentPayment['Giá trị'] == total &&
      currentPayment['Mô tả'].includes(content)
    )
      return true
    return false
  } catch (error) {
    console.log(error)
  }
}
// export const checkPaymentMBBank = async () => {
//   const result = await axios.get(API_SHEET)

//   return result.data.data
// }

export const createPayment = async (data: PaymentApi) => {
  const result = await instance.post('payment/vnpay/create_payment_url', data)
  return result
}
export const createPaymentMomo = async (data: { amount: number }) => {
  const result = await instance.post('payment/momo/create_payment_url', data)
  return result
}
