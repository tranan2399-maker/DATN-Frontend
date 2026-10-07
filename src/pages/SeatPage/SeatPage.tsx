import { CinemaScreenArc } from './components/CinemaScreenArc'
import { SeatLegendStitch } from './components/SeatLegendStitch'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import useAllSeatByShowTime from '@/hooks/useAllSeatByShowTime'
import RenderSeatLayout from './components/RenderSeatLayout'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useDispatch, useSelector } from 'react-redux'
import { ticketAction } from '@/store/ticket'
import { SeatUserList, TicketSelector } from '@/Interface/ticket'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { Seat } from '@/Interface/seat'
import { toast } from 'react-toastify'

interface SeatSelectedType {
  _id: string
  row: number
  column: number
}

const SeatPage = () => {
  const dispatch = useDispatch()
  const { seat: allSeat } = useSelector(
    (state: TicketSelector) => state.ticket.ticket
  )

  const [ticket] = useLocalStorage<TicketType | null>('ticket')

  const {
    data: seats,
    isLoading: loading,
    isError
  } = useAllSeatByShowTime({
    _hallId: ticket?.hall_id?._id || '',
    _showId: ticket?.id_showtime?._id || ''
  })
  const [, setSelectedSeat] = useState<SeatUserList>()
  useEffect(() => {
    if (!seats || seats.length == 0) return
    const newData = seats.map((f: Seat) => {
      const {
        updatedAt,
        createdAt,
        ShowScheduleId,
        ScreeningRoomId,
        TimeSlotId,
        ...seatInfo
      } = f
      return {
        ...seatInfo,
        name: convertNumberToAlphabet(f.row) + f.column,
        selected: false
      }
    })

    if (ticket?.seat) {
      const seatSelectedStorage = ticket.seat
        .map((seat) => (seat.selected ? seat : undefined))
        .filter((seat) => seat !== undefined)

      const seatIdStorage = seatSelectedStorage.map((seat) => seat?._id)
      const combiData = newData.map((seat: SeatUserList) => {
        if (seatIdStorage.includes(seat._id)) {
          return {
            ...seat,
            selected: true
          }
        }
        return seat
      })
      dispatch(ticketAction.fetchSeat(combiData))

      return
    }

    dispatch(ticketAction.fetchSeat(newData))
  }, [seats, dispatch])
  const override = {
    display: 'block',
    margin: '1.6rem auto'
  }
  if (loading) {
    return <HashLoader cssOverride={override} color="#eb3656" />
  }
  if (isError) {
    toast.error('Lịch chiếu hiện tại không có sẵn hoặc ghế không tồn tại', {
      position: 'top-right'
    })
  }

  const updateSeatStatus = (
    seat: SeatUserList,
    selected: boolean
  ): SeatUserList => ({
    ...seat,
    selected
  })
  const getMaxRowCol = (
    seatSelecteds: SeatSelectedType[],
    seat: { _id: string },
    property: keyof SeatSelectedType
  ) => {
    return seatSelecteds
      .filter((seatSel: { _id: string }) => seatSel._id != seat._id)
      .reduce((maxObj, currentObj) => {
        return currentObj[property] > maxObj[property] ? currentObj : maxObj
      })
  }
  const handleUserSeats = (seat: SeatUserList) => {
    const seatResult = allSeat.map((s: SeatUserList) =>
      s._id === seat._id ? updateSeatStatus(s, seat.selected) : s
    )

    const seatSelecteds = seatResult
      .filter((seatSelected) => seatSelected.selected)
      .map((seatSelected) => {
        return {
          _id: seatSelected._id,
          row: seatSelected.row,
          column: seatSelected.column
        }
      })
    if (seatSelecteds.length > 7) {
      toast.error('Chỉ có thể chọn tối đa 7 ghế', {
        position: 'top-center'
      })
      return
    }
    const maxCol =
      seatSelecteds.length > 1
        ? getMaxRowCol(seatSelecteds, seat, 'column')
        : null
    const maxRow =
      seatSelecteds.length > 1 ? getMaxRowCol(seatSelecteds, seat, 'row') : null

    if (
      (maxRow && seat.row - maxRow.row > 1) ||
      (maxCol &&
        maxRow &&
        maxRow.row - seat.row > 0 &&
        seat.column == maxRow?.column) ||
      (maxCol &&
        maxRow &&
        maxRow.row - seat.row > 2 &&
        seat.column !== maxRow?.column) ||
      (maxCol &&
        maxRow &&
        maxCol.column - seat.column == 1 &&
        seat.row == maxCol?.row) ||
      (maxCol &&
        maxRow &&
        maxCol.column - seat.column > 2 &&
        seat.row !== maxCol?.row) ||
      (maxCol && seat.column - maxCol.column > 1)
    ) {
      toast.error(
        'Quý khách nên chọn ghế bên cạnh. Không được để trống ghế ở giữa',
        {
          position: 'top-center'
        }
      )
      return
    }
    dispatch(ticketAction.addProperties({ seat: [...seatResult] }))
  }

  const handleSeatClick = (seat: SeatUserList) => {
    setSelectedSeat(seat)
  }

  return (
    <div className="w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl flex flex-col items-center">
      {/* Heading */}
      <div className="flex items-center justify-between w-full pb-4 border-b border-white/[0.06] mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-headline text-white tracking-wide">
            Chọn ghế ngồi
          </h2>
          <p className="text-xs text-[#A8A8B3] mt-0.5">
            Vui lòng chọn ghế phù hợp trên sơ đồ phòng chiếu (Tối đa 7 ghế)
          </p>
        </div>
      </div>

      {loading && (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <HashLoader cssOverride={override} color="#E50914" />
          <p className="text-xs text-[#A8A8B3] animate-pulse">Đang tải sơ đồ phòng chiếu...</p>
        </div>
      )}

      {!loading && (
        <div className="w-full flex flex-col items-center space-y-6">
          {/* Cinema Screen Arc */}
          <CinemaScreenArc />

          {/* Seat Legend */}
          <SeatLegendStitch />

          {/* Scrollable Seat Matrix Container */}
          <div className="w-full overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {allSeat && allSeat.length > 0 && (
              <div className="min-w-fit mx-auto flex justify-center">
                <RenderSeatLayout
                  seats={allSeat}
                  handleUserSeats={handleUserSeats}
                  handleSeatClick={handleSeatClick}
                />
              </div>
            )}
          </div>

          {/* Mobile hint */}
          <p className="text-[11px] text-[#71717A] text-center md:hidden">
            👉 Vuốt ngang để xem toàn bộ rạp nếu sơ đồ bị che khuất
          </p>
        </div>
      )}
    </div>
  )
}
export default SeatPage
