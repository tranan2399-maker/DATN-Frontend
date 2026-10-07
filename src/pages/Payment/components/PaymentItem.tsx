import { RadioGroupItem } from '@/components/ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentSelected, TicketState, ticketAction } from '@/store/ticket'
import { Check, QrCode, Smartphone, CreditCard } from 'lucide-react'

export interface PaymentItemType {
  method: {
    _id: number
    image: string
    cardNumber: number
    value: string
    name: string
  }
  // eslint-disable-next-line no-unused-vars
  setCardSelected: (id: number) => void
  cardSelected: number
}

const METHOD_DETAILS: Record<number, { title: string; desc: string; badge?: string; icon: any }> = {
  1: {
    title: 'VNPAY-QR / Thẻ ATM & Quốc tế',
    desc: 'Hỗ trợ quét QR trên 40 ứng dụng ngân hàng, Visa, Master, JCB',
    badge: 'Phổ biến',
    icon: CreditCard
  },
  2: {
    title: 'Ví Điện Tử MoMo',
    desc: 'Thanh toán tức thì 1 chạm qua ứng dụng Ví MoMo',
    icon: Smartphone
  },
  3: {
    title: 'VietQR MBBank (Tự động)',
    desc: 'Quét mã VietQR chuyển khoản tức thì, xác nhận trong 5 giây',
    badge: 'Khuyên dùng',
    icon: QrCode
  }
}

function PaymentItem({ method }: PaymentItemType) {
  const dispatch = useDispatch()
  const { paymentMethod: cardSelected } = useSelector(
    (state: { ticket: TicketState }) => state.ticket.ticket
  )
  const isSelected = cardSelected?._id === method._id
  const details = METHOD_DETAILS[method._id] || {
    title: method.name,
    desc: 'Phương thức thanh toán an toàn qua cổng trực tuyến',
    icon: CreditCard
  }
  const IconComponent = details.icon

  const choosePaymentMethod = (data: PaymentSelected) => {
    dispatch(ticketAction.choosePayment(data))
  }

  return (
    <div
      onClick={() => choosePaymentMethod({ _id: method._id, name: method.name })}
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-[#221518] border-[#E50914] shadow-[0_0_16px_rgba(229,9,20,0.3)] ring-1 ring-[#E50914]'
          : 'bg-[#18181E] border-white/[0.08] hover:border-white/20 hover:bg-[#1E1E24]'
      }`}
    >
      {/* Badge if any */}
      {details.badge && (
        <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
          isSelected
            ? 'bg-[#E50914] text-white'
            : 'bg-white/10 text-[#ffd484]'
        }`}>
          {details.badge}
        </span>
      )}

      <div className="flex items-start gap-4">
        {/* Method Logo in crisp container */}
        <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-md">
          <img src={method.image} alt={method.name} className="w-full h-full object-contain" />
        </div>

        <div className="flex-1 min-w-0 pr-8">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white font-headline">
              {details.title}
            </h4>
          </div>
          <p className="text-xs text-[#A8A8B3] mt-1 leading-relaxed">
            {details.desc}
          </p>

          <div className="flex items-center gap-2 mt-3 text-[11px] text-[#71717A]">
            <IconComponent className="w-3.5 h-3.5 text-[#A8A8B3]" />
            <span>Xác nhận vé điện tử ngay sau thanh toán</span>
          </div>
        </div>

        {/* Custom Radio indicator */}
        <div className="shrink-0 pt-0.5">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected
              ? 'border-[#E50914] bg-[#E50914] text-white'
              : 'border-white/20 bg-transparent'
          }`}>
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="hidden">
            <RadioGroupItem value={method.value} id={method.value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentItem
