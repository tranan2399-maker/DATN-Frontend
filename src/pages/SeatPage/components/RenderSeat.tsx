import { changeStatusSeat } from '@/utils/seatAlphaIndex'
import { SeatUserList } from '@/Interface/ticket'
import { RESERVED, SOLD } from '@/utils/constant'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'

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

  const reserved =
    seat.status == RESERVED && !seatSelected?.includes(seat._id)
      ? 'reserved'
      : ''
  const sold = seat.status == 'Sold' ? 'sold' : ''

  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   handleUserSeats({
  //     ...seat,
  //     selected: true
  //   })
  // }
  const handleChooseSeat = () => {
    if (seat.status !== SOLD) {
      handleUserSeats({
        ...seat,
        selected: seat.selected ? false : true
      })
      handleSeatClick(seat)
    }
  }
  return (
    <button
      className={`seat ${status} ${sold} ${reserved} ${seat.selected ? 'selected' : ''} lg:w-16 lg:h-16 md:w-18 md:h-18 sm:w-20 sm:h-20 uppercase`}
      onClick={handleChooseSeat}
      // onTouchEnd={seat.status !== 'booked' ? handleTouchStart : undefined}
      disabled={seat.status == RESERVED && !seatSelected?.includes(seat._id)}
      key={seat._id}
    >
      {seat.name}
    </button>
  )
}

export default RenderSeat
