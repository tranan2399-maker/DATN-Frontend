import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Building2, Film } from 'lucide-react'

export interface DateItem {
  date: Date
  dateStr: string // YYYY-MM-DD
  dayOfWeek: string // Hôm nay, Thứ 2, Thứ 3...
  dayNum: string // 24
  monthNum: string // 09
  hasShowtimes?: boolean
  showtimesCount?: number
}

interface ShowtimeDateFilterBarProps {
  dates: DateItem[]
  selectedDate: string
  onSelectDate: (dateStr: string) => void
  selectedCity: string
  onSelectCity: (city: string) => void
  selectedCinemaId: string
  onSelectCinemaId: (cinemaId: string) => void
  cinemaOptions: Array<{ id: string; name: string }>
  selectedFormat: string
  onSelectFormat: (format: string) => void
  selectedLanguage: string
  onSelectLanguage: (lang: string) => void
}

export const ShowtimeDateFilterBar: React.FC<ShowtimeDateFilterBarProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  selectedCity,
  onSelectCity,
  selectedCinemaId,
  onSelectCinemaId,
  cinemaOptions,
  selectedFormat,
  onSelectFormat,
  selectedLanguage,
  onSelectLanguage
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const formats = [
    'Tất cả định dạng',
    'IMAX Laser',
    'ScreenX',
    '4DX',
    '2D Tiêu chuẩn'
  ]

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -200 : 200
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="sticky top-[70px] z-30 w-full bg-[#0B0B0F]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Date Selector Row */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#1C1C24] hover:bg-[#252530] text-white border border-white/[0.08] shrink-0 mr-2 transition-colors z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto stitch-scrollbar-none py-1 w-full"
          >
            {dates.map((item) => {
              const isActive = item.dateStr === selectedDate
              return (
                <button
                  key={item.dateStr}
                  type="button"
                  onClick={() => onSelectDate(item.dateStr)}
                  className={`date-chip-btn shrink-0 flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all relative ${
                    isActive
                      ? 'bg-[#E50914] text-white font-bold shadow-md shadow-[#E50914]/30 active-date'
                      : 'bg-[#14141A] text-[#A8A8B3] hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    {item.dayOfWeek}
                  </span>
                  <span className="text-base sm:text-lg font-bold leading-tight">
                    {item.dayNum}/{item.monthNum}
                  </span>
                  {item.hasShowtimes && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-0.5"></span>
                  )}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#1C1C24] hover:bg-[#252530] text-white border border-white/[0.08] shrink-0 ml-2 transition-colors z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Filter Row: City / Cinema / Format / Language */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.05]">
          {/* Dropdown Selectors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* City Filter */}
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#E50914] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-8 pr-8 py-1.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C24] text-white text-xs sm:text-sm font-medium border border-white/[0.08] focus:outline-none focus:border-[#E50914] transition-colors cursor-pointer"
              >
                <option value="ALL">Khu vực: Tất cả</option>
                <option value="Hà Nội">Khu vực: Hà Nội</option>
                <option value="Hồ Chí Minh">Khu vực: TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">Khu vực: Đà Nẵng</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#A8A8B3] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Cinema Filter */}
            <div className="relative">
              <Film className="w-4 h-4 text-[#E50914] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCinemaId}
                onChange={(e) => onSelectCinemaId(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-8 pr-8 py-1.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C24] text-white text-xs sm:text-sm font-medium border border-white/[0.08] focus:outline-none focus:border-[#E50914] transition-colors cursor-pointer"
              >
                <option value="ALL">Hệ thống rạp: Tất cả</option>
                {cinemaOptions.map((cinema) => (
                  <option key={cinema.id} value={cinema.id}>
                    {cinema.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#A8A8B3] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Format Pills & Language */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Formats */}
            <div className="flex items-center p-1 rounded-xl bg-[#14141A] border border-white/[0.06] overflow-x-auto stitch-scrollbar-none">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onSelectFormat(fmt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-[#E50914] text-white shadow-sm'
                      : 'text-[#A8A8B3] hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Language */}
            <div className="flex items-center p-1 rounded-xl bg-[#14141A] border border-white/[0.06]">
              <button
                type="button"
                onClick={() => onSelectLanguage('Phụ đề Việt')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedLanguage === 'Phụ đề Việt'
                    ? 'bg-[#252530] text-white'
                    : 'text-[#A8A8B3] hover:text-white'
                }`}
              >
                Phụ đề Việt
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('Lồng tiếng')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedLanguage === 'Lồng tiếng'
                    ? 'bg-[#252530] text-white'
                    : 'text-[#A8A8B3] hover:text-white'
                }`}
              >
                Lồng tiếng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
