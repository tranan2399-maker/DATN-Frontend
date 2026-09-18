import { RadioGroup } from '@/components/ui/radio-group'

import vnpay from '/Images/movies/vnpay2.png'
import momo from '/Images/movies/momo.png'
import mb from '/Images/movies/mb.png'
import PaymentItem from './components/PaymentItem'
import { useState } from 'react'
import UserConfirmPayment from './components/UserConfirmPayment'

const listPaymentMethods = [
  { _id: 1, name: 'VNPay', image: vnpay, cardNumber: 1234, value: '1' },
  { _id: 2, name: 'Momo', image: momo, cardNumber: 1234, value: '2' },
  { _id: 3, name: 'MBBank', image: mb, cardNumber: 1234, value: '3' }
]
function Payment() {
  const [cardSelected, setCardSelected] = useState<number>(1)
  return (
    <div className="">
      <UserConfirmPayment />
      <div className="flex flex-col shadow-xl">
        <div className="border-[1px] border-border-borderPayment border-b-transparent rounded-t-xl px-10 py-5 text-2xl">
          Phương thức thanh toán
        </div>
        <div className="flex  px-10 py-10 border-[1px] rounded-b-xl  border-border-borderPayment">
          <RadioGroup
            defaultValue={'0'}
            className="grid w-full xl:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1  gap-5"
          >
            {listPaymentMethods?.map((method) => {
              return (
                <PaymentItem
                  cardSelected={cardSelected}
                  method={method}
                  key={method._id}
                  setCardSelected={setCardSelected}
                />
              )
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default Payment
