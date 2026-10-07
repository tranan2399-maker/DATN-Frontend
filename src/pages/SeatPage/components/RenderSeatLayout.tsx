import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { useEffect, useState } from 'react'
import RenderSeatRow from './RenderSeatRow'
import { SeatUserList } from '@/Interface/ticket'

interface RenderSeatLayoutType {
  seats: SeatUserList[]
  // eslint-disable-next-line no-unused-vars
  handleUserSeats: (seat: SeatUserList) => void
  // eslint-disable-next-line no-unused-vars
  handleSeatClick: (seat: SeatUserList) => void
}

function RenderSeatLayout({
  seats,
  handleUserSeats,
  handleSeatClick
}: RenderSeatLayoutType) {
  const [rows, setRows] = useState<SeatUserList[][]>([])

  useEffect(() => {
    if (!seats || seats.length === 0) return

    // Verify if seats have valid row numbers across the room (Decision A.2)
    const hasValidRows = seats.every((s) => typeof s.row === 'number' && s.row > 0)

    if (hasValidRows) {
      // Group dynamically by seat.row
      const rowMap = new Map<number, SeatUserList[]>()
      seats.forEach((seat) => {
        const r = seat.row
        if (!rowMap.has(r)) {
          rowMap.set(r, [])
        }
        rowMap.get(r)!.push(seat)
      })

      // Sort rows numerically (Row 1 = A, Row 2 = B, etc.)
      const sortedKeys = Array.from(rowMap.keys()).sort((a, b) => a - b)
      const dynamicRows = sortedKeys.map((k) =>
        rowMap.get(k)!.sort((a, b) => a.column - b.column)
      )
      setRows(dynamicRows)
    } else {
      // Safe Fallback: 8 seats per row chunking
      const seatRows = Math.ceil(seats.length / 8)
      const fallbackRows = Array.from({ length: seatRows }, (_, i) => {
        const startIdx = i * 8
        const endIdx = startIdx + 8
        return seats.slice(startIdx, endIdx)
      })
      setRows(fallbackRows)
    }
  }, [seats])

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 items-center w-full min-w-fit px-2">
      {rows.map((row: SeatUserList[], index: number) => {
        if (!row || row.length === 0) return null
        const rowLetter = convertNumberToAlphabet(row[0].row || index + 1)

        return (
          <div key={index} className="flex items-center gap-2 sm:gap-4 w-auto justify-center">
            {/* Left row letter label */}
            <div className="w-5 text-center text-xs font-bold text-[#A8A8B3] uppercase font-headline shrink-0">
              {rowLetter}
            </div>

            {/* Row of seats */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <RenderSeatRow
                rowSeats={row}
                handleUserSeats={handleUserSeats}
                handleSeatClick={handleSeatClick}
              />
            </div>

            {/* Right row letter label */}
            <div className="w-5 text-center text-xs font-bold text-[#A8A8B3] uppercase font-headline shrink-0">
              {rowLetter}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RenderSeatLayout
