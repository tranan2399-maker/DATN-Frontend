import { TicketType } from '@/store/ticket'
import { filterData, mapData } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { COMPLETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'
import HashLoader from 'react-spinners/HashLoader'
import { ShieldCheck, Film } from 'lucide-react'
import '@/styles/booking-stitch.css'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

function PendingResult() {
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const [, setCountdown] = useLocalStorage<number | null>('countdown')
  const [toastShown, setToastShown] = useState(false)
  const navigate = useNavigate()
  const query = useQuery()

  const onSuccess = (data: string) => {
    if (!toastShown) {
      toast.success('Xác nhận đặt vé thành công!', {
        position: 'top-right'
      })
      setToastShown(true)

      // Save completed ticket info for the digital ticket display
      try {
        localStorage.setItem(
          'lastCompletedTicket',
          JSON.stringify({
            ...ticket,
            resultId: typeof data === 'object' ? (data as any)?._id : data
          })
        )
      } catch (e) {
        console.error(e)
      }

      setTicket({})
      setCountdown(null)
      localStorage.removeItem('paymentToken')
      localStorage.setItem('resultToken', typeof data === 'string' ? data : JSON.stringify(data))
      navigate('/result')
    }
  }

  const onError = () => {
    setCountdown(null)
    setTicket({})
    localStorage.removeItem('paymentToken')
    navigate('/')
  }

  const { mutate: mutateTicket } = useTicket(
    COMPLETE_TICKET,
    onSuccess,
    onError
  )

  const typeBank = query.has('partnerCode') && query.get('partnerCode')
  const typePayment = 'ATM'
  const amount = query.has('amount') && query.get('amount')

  useLayoutEffect(() => {
    if (!ticket || Object.keys(ticket).length === 0) return navigate('/')

    const foodObject = filterData(
      ticket.foods,
      (food) => food.quantity > 0
    ).map((food) => {
      return {
        foodId: food._id,
        quantityFood: food.quantity,
        name: food.name,
        price: food.price
      }
    })

    mutateTicket({
      typeBank: typeBank,
      typePayment,
      amount,
      userId: ticket.userId || '65de035201e3eea140eaa0b8',
      ticket_id: ticket.ticket_id,
      priceId: {
        _id: ticket?.price_id,
        price: ticket.price_movie
      },
      seatId: mapData(ticket.seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime,
      totalFood: ticket.totalFood
    })
  }, [])

  if (!query.has('partnerCode') || !query.has('amount')) {
    navigate('/')
    return null
  }

  return (
    <div className="booking-stitch min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#131317] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center text-[#ff8080] shadow-[0_0_20px_rgba(229,9,20,0.25)]">
          <Film className="w-8 h-8" />
        </div>

        <div className="py-2">
          <HashLoader size={48} color="#E50914" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold font-headline text-white">
            Đang hoàn tất đặt vé...
          </h3>
          <p className="text-xs text-[#A8A8B3] leading-relaxed">
            Hệ thống đang xác nhận thanh toán với cổng ngân hàng và khởi tạo mã vé xem phim điện tử cho bạn.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#18181E] border border-white/[0.06] text-[11px] text-[#71717A]">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Vui lòng không tải lại trang để tránh trùng lặp giao dịch</span>
        </div>
      </div>
    </div>
  )
}

export default PendingResult
