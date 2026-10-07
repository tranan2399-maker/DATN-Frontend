import useTicket from '@/hooks/useTicket'
import { TicketType } from '@/store/ticket'
import { DELETE_TICKET } from '@/utils/constant'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect, useState, useRef } from 'react'
import { useCountdown } from 'usehooks-ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Clock, AlertTriangle } from 'lucide-react'

function TimeCountDown() {
  const navigate = useNavigate()
  const [intervalValue] = useState<number>(1000)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const mutation = useTicket(DELETE_TICKET)
  const [countdown, setCountdown] = useLocalStorage<number | null>('countdown')
  const warnedRef = useRef(false)

  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: countdown ? countdown : 140,
    intervalMs: intervalValue
  })

  useEffect(() => {
    startCountdown()
    setCountdown(count)

    // Cảnh báo khi còn 30 giây
    if (count === 30 && !warnedRef.current) {
      warnedRef.current = true
      toast.warn('Bạn còn 30 giây để hoàn tất đơn đặt vé!', {
        position: 'top-right',
        autoClose: 4000
      })
    }

    // Xử lý khi hết thời gian giữ ghế
    if (count <= 1) {
      stopCountdown()
      if (ticket?.ticket_id) {
        mutation.mutate({
          ticket_id: ticket.ticket_id
        })
      }
      setCountdown(null)
      toast.error('Thời gian giữ vé đã hết! Vui lòng chọn lại suất chiếu.', {
        position: 'top-right',
        autoClose: 4000
      })
      navigate('/')
      setTicket({})
    }
  }, [count])

  const minutes = Math.floor(count / 60)
  const remainingSeconds = count % 60
  const isUrgent = count <= 30

  return (
    <div className="flex items-center gap-2">
      {isUrgent ? (
        <AlertTriangle className="w-5 h-5 text-red-500 animate-bounce" />
      ) : (
        <Clock className="w-5 h-5 text-amber-400" />
      )}
      <p
        className={`text-2xl font-bold font-mono transition-colors duration-300 ${
          isUrgent ? 'text-red-500 animate-pulse' : 'text-primary-movieColor'
        }`}
      >
        {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </p>
      {isUrgent && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium border border-red-500/30 animate-pulse">
          Sắp hết hạn
        </span>
      )}
    </div>
  )
}

export default TimeCountDown
