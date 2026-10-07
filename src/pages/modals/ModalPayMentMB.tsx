import { checkPaymentMBBank } from '@/api/payment'
import { DialogClose } from '@/components/ui/dialog'
import { TicketType } from '@/store/ticket'
import { formatVND } from '@/utils'
import { getNameSeat } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Loader2, ArrowLeft, Copy, Check, QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ModalPayMentMB() {
  const [isLoadingPayment, setIsLoadingPayment] = useState(true)
  const [copiedStk, setCopiedStk] = useState(false)
  const [copiedContent, setCopiedContent] = useState(false)
  const navigate = useNavigate()
  const my_bank = { BANK_ID: 'MB', ACCOUNT_NUMBER: 9830908070605 }
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const infoTicket = (ticket?.name_movie || '') + getNameSeat(ticket?.seat, '') + '1'
  const QR = `https://img.vietqr.io/image/${my_bank.BANK_ID}-${my_bank.ACCOUNT_NUMBER}-compact2.png?amount=${ticket?.total || 0}&addInfo=${encodeURIComponent(infoTicket)}&accountName=ENVIDI`

  useEffect(() => {
    let count = 0
    let idInterval: NodeJS.Timeout

    const checkPayment = async () => {
      try {
        if (!ticket?.total) return;
        const result = await checkPaymentMBBank(ticket.total, infoTicket)
        if (result) {
          clearInterval(idInterval)
          setTimeout(() => {
            navigate(`/pending?partnerCode=MBBank&amount=${ticket.total}`)
          }, 3000)
        } else {
          count++
          if (count > 10) {
            clearInterval(idInterval)
          }
        }
      } catch (error) {
        toast.error('Thanh toán thất bại, vui lòng thử lại!')
      } finally {
        setIsLoadingPayment(false)
      }
    }
    const idTimeOut = setTimeout(() => {
      idInterval = setInterval(checkPayment, 4000)
    }, 10000)

    return () => {
      clearTimeout(idTimeOut)
      clearInterval(idInterval)
    }
  }, [ticket.total, navigate, infoTicket])

  const copyToClipboard = (text: string, type: 'stk' | 'content') => {
    navigator.clipboard.writeText(text)
    if (type === 'stk') {
      setCopiedStk(true)
      setTimeout(() => setCopiedStk(false), 2000)
    } else {
      setCopiedContent(true)
      setTimeout(() => setCopiedContent(false), 2000)
    }
    toast.success('Đã sao chép vào bộ nhớ tạm!')
  }

  return (
    <div className="w-full bg-[#131317] text-white p-5 sm:p-6 md:p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_10px_rgba(229,9,20,0.5)]">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-headline">
              Thanh Toán VietQR MBBank
            </h3>
            <p className="text-xs text-[#A8A8B3]">
              Hệ thống tự động kích hoạt vé ngay khi nhận tiền
            </p>
          </div>
        </div>

        <DialogClose asChild>
          <button
            type="button"
            className="text-xs text-[#A8A8B3] hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1E1E24] hover:bg-[#2A2A34] border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại</span>
          </button>
        </DialogClose>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* QR Code Presentation */}
        <div className="flex flex-col items-center justify-center p-5 bg-[#18181E] border border-white/[0.06] rounded-2xl">
          <div className="p-3 bg-white rounded-2xl shadow-2xl">
            <img
              src={QR}
              alt="Mã VietQR"
              className="w-56 h-56 object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#ffd484]">
            <Loader2 className="w-4 h-4 animate-spin text-[#E50914]" />
            <span>Đang đợi thanh toán chuyển khoản...</span>
          </div>

          <p className="text-[11px] text-[#71717A] text-center mt-2 max-w-xs">
            Mở app ngân hàng bất kỳ (MBBank, Vietcombank, Techcombank, Momo...) quét mã để thanh toán tức thì
          </p>
        </div>

        {/* Transfer Details Card */}
        <div className="space-y-4 bg-[#18181E] border border-white/[0.06] rounded-2xl p-5 text-xs">
          <div>
            <span className="text-[#71717A] block text-[11px]">Phim:</span>
            <h4 className="font-bold text-white text-sm truncate font-headline">
              {ticket?.name_movie || 'Chưa có thông tin'}
            </h4>
            <p className="text-[#A8A8B3] text-[11px] mt-0.5">
              Ghế: <strong className="text-white">{getNameSeat(ticket?.seat, ', ')}</strong>
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#71717A]">Số tiền:</span>
              <span className="text-lg font-bold font-headline text-[#ffd484]">
                {formatVND(ticket?.total)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#71717A]">Ngân hàng:</span>
              <span className="font-semibold text-white">MB Bank (Ngân Hàng Quân Đội)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#71717A]">Chủ tài khoản:</span>
              <span className="font-semibold text-white">ENVIDI</span>
            </div>

            <div className="flex items-center justify-between bg-[#131317] p-2.5 rounded-xl border border-white/[0.04]">
              <div>
                <span className="text-[#71717A] text-[10px] block">Số tài khoản:</span>
                <span className="font-mono font-bold text-white text-xs">9830908070605</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('9830908070605', 'stk')}
                className="px-2.5 py-1 rounded-lg bg-[#24242C] hover:bg-[#2F2F3A] text-white text-[11px] font-semibold flex items-center gap-1 border border-white/10"
              >
                {copiedStk ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedStk ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#131317] p-2.5 rounded-xl border border-white/[0.04]">
              <div className="min-w-0 pr-2">
                <span className="text-[#71717A] text-[10px] block">Nội dung chuyển khoản:</span>
                <span className="font-mono font-bold text-white text-xs truncate block">{infoTicket}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(infoTicket, 'content')}
                className="px-2.5 py-1 rounded-lg bg-[#24242C] hover:bg-[#2F2F3A] text-white text-[11px] font-semibold flex items-center gap-1 border border-white/10 shrink-0"
              >
                {copiedContent ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedContent ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPayMentMB
