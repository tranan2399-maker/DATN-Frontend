import RenderSeat from './RenderSeat'
import { SeatUserList } from '@/Interface/ticket'

interface RenderSeatRowType {
  rowSeats: SeatUserList[]
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seat: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: SeatUserList) => void
}
function RenderSeatRow({
  rowSeats,
  handleUserSeats,
  handleSeatClick
}: RenderSeatRowType) {
  return (
    <div className="row ">
      {rowSeats.map((seat: SeatUserList, index: number) => {
        return (
          <RenderSeat
            key={index}
            seat={seat}
            handleUserSeats={handleUserSeats}
            handleSeatClick={handleSeatClick}
          />
        )
      })}
    </div>
  )
}

export default RenderSeatRow
