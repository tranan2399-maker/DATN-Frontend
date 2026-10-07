import { RadioGroup } from '@/components/ui/radio-group'
import vnpay from '/Images/movies/vnpay2.png'
import momo from '/Images/movies/momo.png'
import vcb from '/Images/movies/vcb.png'
import PaymentItem from './components/PaymentItem'
import { useState } from 'react'
import UserConfirmPayment from './components/UserConfirmPayment'
import { CreditCard, ShieldCheck } from 'lucide-react'

const listPaymentMethods = [
  { _id: 1, name: 'VNPay', image: vnpay, cardNumber: 1234, value: '1' },
  { _id: 2, name: 'Momo', image: momo, cardNumber: 1234, value: '2' },
  { _id: 3, name: 'Vietcombank', image: vcb, cardNumber: 2558, value: '3' }
]

function Payment() {
  const [cardSelected, setCardSelected] = useState<number>(1)
  const [agreed, setAgreed] = useState<boolean>(true)

  return (
    <div className="w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl space-y-6">
      {/* User Information Block */}
      <UserConfirmPayment />

      {/* Payment Methods Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <CreditCard className="w-5 h-5 text-[#E50914]" />
          <div>
            <h3 className="text-lg font-bold font-headline text-white">
              Chọn phương thức thanh toán
            </h3>
            <p className="text-xs text-[#A8A8B3]">
              Giao dịch an toàn được mã hóa 256-bit SSL
            </p>
          </div>
        </div>

        <RadioGroup defaultValue={'1'} className="grid grid-cols-1 gap-3">
          {listPaymentMethods?.map((method) => (
            <PaymentItem
              cardSelected={cardSelected}
              method={method}
              key={method._id}
              setCardSelected={setCardSelected}
            />
          ))}
        </RadioGroup>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="pt-4 border-t border-white/[0.06]">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded accent-[#E50914] cursor-pointer"
          />
          <span className="text-xs text-[#A8A8B3] leading-relaxed">
            Tôi đồng ý với{' '}
            <span className="text-white underline hover:text-[#ffd484]">Điều khoản sử dụng dịch vụ</span>{' '}
            và cam kết thông tin đặt vé là chính xác. Vé đã mua không thể hoàn tiền theo quy định của rạp.
          </span>
        </label>
      </div>

      {/* Security Guarantee Note */}
      <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-[#18181E] border border-white/[0.04] text-xs text-[#71717A]">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Bảo mật thanh toán PCI DSS tiêu chuẩn quốc tế. Thông tin thẻ không được lưu trữ tại hệ thống rạp.</span>
      </div>
    </div>
  )
}

export default Payment
