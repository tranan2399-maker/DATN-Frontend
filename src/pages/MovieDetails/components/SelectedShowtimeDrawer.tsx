import React from 'react'
import { Film, ArrowRight } from 'lucide-react'
import { ShowtimeItem } from './CinemaShowtimeList'

interface SelectedShowtimeDrawerProps {
  selectedShowtime: ShowtimeItem | null
  dateFormatted: string
  onProceedBooking: () => void
}

export const SelectedShowtimeDrawer: React.FC<SelectedShowtimeDrawerProps> = ({
  selectedShowtime,
  dateFormatted,
  onProceedBooking
}) => {
  if (!selectedShowtime) return null

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' đ'
  }

  const cinemaName =
    selectedShowtime.cinemaId.name ||
    selectedShowtime.cinemaId.CinemaName ||
    'Dream Cinema'
  const roomName = selectedShowtime.screenRoomId.name || 'Phòng chiếu tiêu chuẩn'
  const timeFromStr = selectedShowtime.timeFrom
    ? (selectedShowtime.timeFrom.includes(' ')
        ? selectedShowtime.timeFrom.split(' ')[1]
        : selectedShowtime.timeFrom)
    : '19:00'

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-3 sm:px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-[1248px] mx-auto pointer-events-auto">
        <div className="p-4 md:px-6 md:py-3.5 rounded-2xl bg-[#1C1C24]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-black/80 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Selected Information */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0 border border-[#E50914]/30">
              <Film className="w-5 h-5 text-[#E50914]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base text-white font-bold">
                  {timeFromStr} · {dateFormatted}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold">
                  {selectedShowtime.format || '2D Digital'}
                </span>
              </div>
              <p className="text-xs text-[#A8A8B3] truncate mt-0.5">
                {cinemaName} · {roomName} (Phụ đề tiếng Việt)
              </p>
            </div>
          </div>

          {/* Price & CTA Action */}
          <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto shrink-0">
            <div className="text-left md:text-right">
              <span className="text-[11px] text-[#A8A8B3] uppercase tracking-wider block">
                Giá vé dự kiến
              </span>
              <span className="text-lg sm:text-xl text-[#F5B301] font-extrabold leading-none">
                {formatCurrency(selectedShowtime.price)}{' '}
                <span className="text-xs font-normal text-[#A8A8B3]">/vé</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onProceedBooking}
              className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-[#E50914] hover:bg-[#FF2D3A] active:bg-[#B20710] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#E50914]/35 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <span>TIẾP TỤC: CHỌN GHẾ</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
