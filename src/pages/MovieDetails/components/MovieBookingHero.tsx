import React, { useState } from 'react'
import { Plus, Check, Loader, Star, ArrowLeftRight, PlayCircle } from 'lucide-react'

interface MovieBookingHeroProps {
  movie: {
    _id: string
    name: string
    image: string
    rate?: number
    duration?: number | string
    fromDate?: string
    desc?: string
    trailer?: string
    categoryCol?: Array<{ _id: string; name: string }>
    age_limit?: number
    author?: string
    actor?: string
  }
  isWatchlisted: boolean
  isWatchlistPending: boolean
  onToggleWatchlist: () => void
  onOpenTrailer: () => void
  onOpenMovieSwitcher: () => void
}

export const MovieBookingHero: React.FC<MovieBookingHeroProps> = ({
  movie,
  isWatchlisted,
  isWatchlistPending,
  onToggleWatchlist,
  onOpenTrailer,
  onOpenMovieSwitcher
}) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false)

  // Format age badge
  const ageLimit = movie.age_limit || 13
  let ageBadge = 'T13'
  let ageColor = 'bg-[#F59E0B]'
  if (ageLimit >= 18) {
    ageBadge = 'T18'
    ageColor = 'bg-[#E50914]'
  } else if (ageLimit >= 16) {
    ageBadge = 'T16'
    ageColor = 'bg-[#F97316]'
  } else if (ageLimit < 13) {
    ageBadge = 'P'
    ageColor = 'bg-[#22C55E]'
  }

  // Format rating: scale 1-5 to 1-10
  const ratingScore = movie.rate ? (movie.rate > 5 ? movie.rate : (movie.rate * 2).toFixed(1)) : '9.0'

  // Safe date parsing without NaN/NaN/NaN
  const formatReleaseDate = (val?: string) => {
    if (!val) return 'Đang cập nhật'
    if (typeof val === 'string' && (val.includes('-') || val.includes('/'))) {
      const datePart = val.trim().split(' ')[0]
      const parts = datePart.split(/[-/]/)
      if (parts.length === 3) {
        if (parts[0].length === 4) return `${parts[2]}/${parts[1]}/${parts[0]}` // YYYY-MM-DD -> DD/MM/YYYY
        if (parts[2].length === 4) return `${parts[0]}/${parts[1]}/${parts[2]}` // DD-MM-YYYY -> DD/MM/YYYY
      }
    }
    const d = new Date(val)
    if (!isNaN(d.getTime())) {
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
    }
    return '30/07/2026'
  }

  const releaseDateStr = formatReleaseDate(movie.fromDate)

  // Format runtime
  const durationStr = typeof movie.duration === 'number' ? `${movie.duration} phút` : (movie.duration || '120 phút')

  const categories = movie.categoryCol?.map(c => c.name).join(', ') || 'Hành động, Phiêu lưu'

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0F] border-b border-white/[0.08]">
      {/* Backdrop visual with dark radial scrim */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen scale-105 filter blur-[3px]"
        style={{ backgroundImage: `url('${movie.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          {/* Poster & Core Meta */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left w-full md:w-auto">
            {/* Poster Card */}
            <div className="relative w-28 sm:w-32 md:w-36 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-[#1C1C24] border border-white/[0.1] shrink-0">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-white text-[11px] font-bold shadow-md ${ageColor}`}
              >
                {ageBadge}
              </div>
            </div>

            {/* Info Block */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E50914]/20 text-[#FF4D58] text-xs font-semibold border border-[#E50914]/30">
                  Phim đang chiếu
                </span>
                <span className="px-2 py-0.5 rounded bg-[#252530] text-[#A8A8B3] text-xs">
                  {durationStr}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#252530] text-[#A8A8B3] text-xs">
                  Khởi chiếu: {releaseDateStr}
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F5B301]/15 text-[#F5B301] text-xs font-bold border border-[#F5B301]/30">
                  <Star className="w-3.5 h-3.5 fill-[#F5B301] text-[#F5B301]" />
                  {ratingScore}/10 (Đánh giá cao)
                </span>
              </div>

              <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl text-white font-extrabold uppercase tracking-tight">
                {movie.name}
              </h1>

              <div className="text-xs sm:text-sm text-[#A8A8B3] leading-relaxed">
                <p className="font-medium text-white/90 mb-1">
                  {categories}
                  {movie.author && ` · Đạo diễn: ${movie.author}`}
                </p>
                <p className={`text-[#A8A8B3] ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
                  {movie.desc || 'Trải nghiệm điện ảnh đỉnh cao chuẩn quốc tế với hệ thống phòng chiếu hiện đại và dịch vụ chuẩn VIP hàng đầu Việt Nam.'}
                </p>
                {movie.desc && movie.desc.length > 120 && (
                  <button
                    type="button"
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="text-[#FF4D58] hover:underline font-semibold text-xs mt-0.5 inline-block"
                  >
                    {isDescExpanded ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                )}
              </div>

              {/* Available Technologies Chips */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C24] border border-white/[0.08] text-[#FFFFFF] text-[11px] font-medium">
                  IMAX 3D Laser
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C24] border border-white/[0.08] text-[#FFFFFF] text-[11px] font-medium">
                  Dolby Atmos
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C24] border border-white/[0.08] text-[#FFFFFF] text-[11px] font-medium">
                  ScreenX 270°
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C24] border border-white/[0.08] text-[#FFFFFF] text-[11px] font-medium">
                  4DX
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C24] border border-white/[0.08] text-[#FFFFFF] text-[11px] font-medium">
                  2D Digital
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenMovieSwitcher}
              className="group flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-white text-xs sm:text-sm font-medium transition-colors border border-white/[0.08] shadow-sm"
            >
              <ArrowLeftRight className="w-4 h-4 text-[#A8A8B3] group-hover:text-white transition-colors" />
              Đổi phim khác
            </button>

            {movie.trailer && (
              <button
                type="button"
                onClick={onOpenTrailer}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#252530] hover:bg-[#2E2E3C] text-white text-xs sm:text-sm font-medium transition-colors border border-white/[0.1] shadow-sm"
              >
                <PlayCircle className="w-4 h-4 text-[#E50914]" />
                Xem Trailer
              </button>
            )}

            <button
              type="button"
              onClick={onToggleWatchlist}
              disabled={isWatchlistPending}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border shadow-sm ${
                isWatchlisted
                  ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40'
                  : 'bg-[#1C1C24] hover:bg-[#252530] text-white border-white/[0.08]'
              }`}
            >
              {isWatchlistPending ? (
                <Loader className="w-4 h-4 animate-spin text-white" />
              ) : isWatchlisted ? (
                <>
                  <Check className="w-4 h-4 text-[#22C55E]" /> Đã lưu
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Xem sau
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
