import { changeStatusSeat } from '@/utils/seatAlphaIndex'
import { SeatUserList } from '@/Interface/ticket'
import { RESERVED, SOLD } from '@/utils/constant'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { formatVND } from '@/utils'

interface RenderSeatType {
  seat: SeatUserList
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seatId: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: SeatUserList) => void
}

function RenderSeat({
  seat,
  handleUserSeats,
  handleSeatClick
}: RenderSeatType) {
  const [ticket] = useLocalStorage<TicketType | null>('ticket')
  const status = changeStatusSeat(seat.typeSeat)
  const seatSelected =
    ticket?.seat && ticket?.seat.filter((s) => s.selected).map((s) => s._id)

  const isReserved = seat.status === RESERVED && !seatSelected?.includes(seat._id)
  const isSold = seat.status === SOLD || seat.status === 'Sold'
  const isSelected = Boolean(seat.selected)
  const isVip = seat.typeSeat === 'VIP' || status === 'vip'

  const handleChooseSeat = () => {
    if (!isSold && !isReserved) {
      handleUserSeats({
        ...seat,
        selected: !seat.selected
      })
      handleSeatClick(seat)
    }
  }

  // Base styling classes
  let seatClass = 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center select-none '

  if (isSold || isReserved) {
    seatClass += 'bg-[#141418] text-[#55555F] border border-white/5 cursor-not-allowed opacity-50'
  } else if (isSelected) {
    seatClass += 'bg-[#E50914] text-white border border-[#FFB4AA] shadow-[0_0_14px_rgba(229,9,20,0.65)] scale-105 z-10 cursor-pointer font-extrabold'
  } else if (isVip) {
    seatClass += 'bg-[#2E181B] text-[#FFD484] border border-[#FFD484]/40 hover:border-[#FFD484] hover:bg-[#3D1F23] shadow-[0_0_8px_rgba(255,212,132,0.15)] cursor-pointer'
  } else {
    seatClass += 'bg-[#1E1E24] text-[#E4E1E7] border border-white/10 hover:border-white/40 hover:bg-[#2A2A34] cursor-pointer'
  }

  const tooltipText = `${seat.name} - ${isVip ? 'Ghế VIP' : 'Ghế Thường'}${seat.price ? ' (' + formatVND(seat.price) + ')' : ''}`

  return (
    <button
      type="button"
      className={seatClass}
      onClick={handleChooseSeat}
      disabled={isSold || isReserved}
      key={seat._id}
      title={tooltipText}
      aria-label={tooltipText}
    >
      {isSold || isReserved ? '✕' : seat.name}
    </button>
  )
}

export default RenderSeat
