import React, { useState } from 'react'
import { CalendarX, Navigation, MapPin, ExternalLink, Heart, ArrowRight } from 'lucide-react'

export interface ShowtimeItem {
  _id: string
  timeFrom: string
  timeTo: string
  date: string | Date
  screenRoomId: {
    _id: string
    name: string
  }
  cinemaId: {
    _id: string
    name?: string
    CinemaName?: string
    address?: string
    CinemaAdress?: string
    city?: string
    amenities?: string[]
    badge?: string
  }
  format?: string
  price: number
  price_id: string
  availableSeats?: number
}

export interface CinemaGroup {
  cinemaId: string
  cinemaName: string
  cinemaAddress: string
  badge: string
  amenities: string[]
  rating: string
  distance?: string
  rooms: Array<{
    roomId: string
    roomName: string
    format: string
    showtimes: ShowtimeItem[]
  }>
}

interface CinemaShowtimeListProps {
  cinemaGroups: CinemaGroup[]
  selectedShowtimeId: string | null
  onSelectShowtime: (showtime: ShowtimeItem) => void
  selectedDateFormatted: string
  totalShowtimesCount: number
  onResetFilters?: () => void
  availableDateWithShowtimes?: { dateStr: string; label: string; count: number } | null
  onSelectSpecificDate?: (dateStr: string) => void
}

export const CinemaShowtimeList: React.FC<CinemaShowtimeListProps> = ({
  cinemaGroups,
  selectedShowtimeId,
  onSelectShowtime,
  selectedDateFormatted,
  totalShowtimesCount,
  onResetFilters,
  availableDateWithShowtimes,
  onSelectSpecificDate
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const toggleFavorite = (cinemaId: string) => {
    setFavorites(prev => ({ ...prev, [cinemaId]: !prev[cinemaId] }))
  }

  // Format time HH:mm
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '00:00'
    const parts = timeStr.trim().split(' ')
    if (parts.length >= 2) return parts[1] // "DD-MM-YYYY HH:mm" -> "HH:mm"
    return timeStr
  }

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + ' đ'
  }

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Active Filter Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#A8A8B3] px-1">
        <p className="flex items-center gap-1.5 flex-wrap">
          Tìm thấy{' '}
          <span className="text-white font-bold">{cinemaGroups.length} cụm rạp</span> với{' '}
          <span className="text-[#E50914] font-bold">{totalShowtimesCount} suất chiếu</span>{' '}
          phù hợp cho {selectedDateFormatted}.
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>Còn nhiều ghế
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>Sắp hết ghế
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>Gần hết (&lt;10 ghế)
          </span>
        </div>
      </div>

      {/* Empty State */}
      {cinemaGroups.length === 0 && (
        <div className="p-8 sm:p-12 rounded-2xl bg-[#14141A] border border-white/[0.08] text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#1C1C24] flex items-center justify-center mx-auto text-[#E50914]">
            <CalendarX className="w-8 h-8 text-[#E50914]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Không có suất chiếu phù hợp cho ngày này
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A8B3] max-w-md mx-auto">
              Hiện chưa có suất chiếu phù hợp với bộ lọc trong ngày này. Vui lòng chọn một ngày khác có suất chiếu bên dưới.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {availableDateWithShowtimes && onSelectSpecificDate && (
              <button
                type="button"
                onClick={() => onSelectSpecificDate(availableDateWithShowtimes.dateStr)}
                className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF2D3A] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#E50914]/30 flex items-center gap-2"
              >
                <span>Xem lịch ngày {availableDateWithShowtimes.label} ({availableDateWithShowtimes.count} suất)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-white text-xs sm:text-sm font-semibold transition-all border border-white/[0.1]"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cinema Cards List */}
      <div className="space-y-6">
        {cinemaGroups.map((cinema) => (
          <article
            key={cinema.cinemaId}
            className="stitch-cinema-card bg-[#14141A] rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-xl space-y-5"
          >
            {/* Cinema Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h2 className="font-headline text-lg sm:text-xl md:text-2xl text-white font-bold tracking-tight">
                    {cinema.cinemaName}
                  </h2>
                  {cinema.distance && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E50914]/20 text-[#FF4D58] text-[11px] font-semibold flex items-center gap-1 border border-[#E50914]/30">
                      <Navigation className="w-3 h-3 text-[#FF4D58]" />
                      {cinema.distance}
                    </span>
                  )}
                  {cinema.badge && (
                    <span className="px-2 py-0.5 rounded bg-[#F5B301]/20 text-[#F5B301] text-[11px] font-bold uppercase tracking-wider border border-[#F5B301]/30">
                      {cinema.badge}
                    </span>
                  )}
                </div>

                {/* Address & Google Maps link */}
                <p className="text-xs sm:text-sm text-[#A8A8B3] flex items-center gap-1.5 flex-wrap">
                  <MapPin className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>{cinema.cinemaAddress}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      cinema.cinemaName + ' ' + cinema.cinemaAddress
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38BDF8] hover:underline ml-1 font-medium inline-flex items-center gap-0.5 text-xs"
                  >
                    Xem bản đồ <ExternalLink className="w-3 h-3" />
                  </a>
                </p>

                {/* Amenities chips */}
                {cinema.amenities && cinema.amenities.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {cinema.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-[#1C1C24] text-[11px] text-[#A8A8B3] border border-white/[0.05]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action & Rating */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => toggleFavorite(cinema.cinemaId)}
                  className="p-2 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-[#A8A8B3] hover:text-white transition-colors border border-white/[0.08]"
                  title="Lưu rạp yêu thích"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[cinema.cinemaId] ? 'fill-[#E50914] text-[#E50914]' : 'text-[#A8A8B3]'
                    }`}
                  />
                </button>
                <span className="text-xs text-[#A8A8B3]">
                  Đánh giá: <strong className="text-[#F5B301]">{cinema.rating || '4.9'} / 5.0</strong>
                </span>
              </div>
            </div>

            {/* Room / Format Groups */}
            <div className="space-y-6 pt-1">
              {cinema.rooms.map((room) => (
                <div key={room.roomId} className="space-y-3">
                  {/* Format Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-[#E50914]"></span>
                      <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Định dạng: {room.format || '2D DIGITAL ATMOS'} · Phụ đề tiếng Việt
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-[#1C1C24] text-[10px] text-[#F5B301] font-semibold border border-white/[0.05]">
                        Standard Luxe
                      </span>
                    </div>
                    <span className="text-xs text-[#A8A8B3] hidden sm:inline">
                      {room.roomName}
                    </span>
                  </div>

                  {/* Showtime Slots Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {room.showtimes.map((slot) => {
                      const isSelected = selectedShowtimeId === slot._id
                      const startTime = formatTime(slot.timeFrom)
                      const endTime = slot.timeTo ? formatTime(slot.timeTo) : ''

                      // Seat status
                      const seats = slot.availableSeats ?? 45
                      let seatColor = 'bg-[#22C55E]'
                      let seatLabel = `Còn ${seats} ghế`
                      if (seats < 10) {
                        seatColor = 'bg-[#EF4444]'
                        seatLabel = `Còn ${seats} vé`
                      } else if (seats < 25) {
                        seatColor = 'bg-[#F59E0B]'
                        seatLabel = 'Sắp hết ghế'
                      }

                      return (
                        <div
                          key={slot._id}
                          onClick={() => onSelectShowtime(slot)}
                          className={`showtime-slot-card cursor-pointer group p-3 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-center ${
                            isSelected ? 'active-slot' : ''
                          }`}
                        >
                          <div
                            className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                              isSelected ? 'text-[#E50914]' : 'text-white group-hover:text-[#E50914]'
                            }`}
                          >
                            {startTime}
                          </div>
                          {endTime && (
                            <div className="text-[11px] text-[#A8A8B3] mt-0.5">
                              ~{endTime}
                            </div>
                          )}
                          <div className="flex items-center justify-center gap-1.5 mt-2">
                            <span className={`w-2 h-2 rounded-full ${seatColor}`}></span>
                            <span className="text-[11px] text-[#A8A8B3]">{seatLabel}</span>
                          </div>
                          <div className="mt-1.5 text-xs font-bold text-[#F5B301]">
                            {formatCurrency(slot.price)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
