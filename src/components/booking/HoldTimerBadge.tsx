import { useLocalStorage } from '@uidotdev/usehooks'
import { useCountdown } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import useTicket from '@/hooks/useTicket'
import { TicketType } from '@/store/ticket'
import { DELETE_TICKET } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'

interface HoldTimerBadgeProps {
  className?: string
}

export function HoldTimerBadge({ className = '' }: HoldTimerBadgeProps) {
  const navigate = useNavigate()
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const mutation = useTicket(DELETE_TICKET)
  const [countdown, setCountdown] = useLocalStorage<number | null>('countdown')
  const [showExpiredDialog, setShowExpiredDialog] = useState(false)

  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: countdown ? countdown : 140,
    intervalMs: 1000
  })

  useEffect(() => {
    startCountdown()
    setCountdown(count)
    if (count === 1) {
      stopCountdown()
      if (ticket?.ticket_id) {
        mutation.mutate({
          ticket_id: ticket.ticket_id
        })
      }
      setCountdown(null)
      setShowExpiredDialog(true)
    }
  }, [count])

  const minutes = Math.floor(count / 60)
  const remainingSeconds = count % 60
  const isUrgent = count <= 30

  const handleExpiredConfirm = () => {
    setShowExpiredDialog(false)
    setTicket({})
    navigate('/purchase/seat')
  }

  const handleExpiredHome = () => {
    setShowExpiredDialog(false)
    setTicket({})
    navigate('/')
  }

  return (
    <>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          isUrgent
            ? 'bg-[#E50914]/15 border-[#E50914] text-[#ff8080] animate-pulse shadow-[0_0_12px_rgba(229,9,20,0.35)]'
            : 'bg-[#1F1F24] border-white/10 text-[#e4e1e7]'
        } ${className}`}
      >
        <Clock className={`w-4 h-4 ${isUrgent ? 'text-[#ff8080]' : 'text-[#ffd484]'}`} />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A8A8B3]">
          Giữ vé:
        </span>
        <span className={`text-xs font-mono font-bold ${isUrgent ? 'text-white' : 'text-white'}`}>
          {minutes}:{remainingSeconds < 10 ? '0' : ''}
          {remainingSeconds}
        </span>
      </div>

      {showExpiredDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#131317] border border-[#E50914]/50 rounded-2xl p-6 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#E50914]/20 flex items-center justify-center text-[#E50914]">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Thời gian giữ vé đã hết
            </h3>
            <p className="text-sm text-[#A8A8B3] leading-relaxed">
              Suất chiếu và các ghế bạn chọn đã được tự động giải phóng để nhường cho khách hàng khác. Vui lòng chọn lại ghế để tiếp tục đặt vé.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleExpiredConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#ff1a26] text-white text-xs font-bold transition-all shadow-md"
              >
                Chọn lại ghế
              </button>
              <button
                onClick={handleExpiredHome}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#1F1F24] hover:bg-[#2A2A32] text-[#A8A8B3] hover:text-white text-xs font-semibold transition-all border border-white/10"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
