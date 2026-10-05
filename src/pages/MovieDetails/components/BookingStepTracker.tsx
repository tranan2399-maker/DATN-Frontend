import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

interface BookingStepTrackerProps {
  movieName: string
}

export const BookingStepTracker: React.FC<BookingStepTrackerProps> = ({ movieName }) => {
  return (
    <section className="w-full bg-[#14141A] border-b border-white/[0.08] shadow-md relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Breadcrumb navigation */}
        <nav aria-label="Đường dẫn trang" className="flex items-center gap-1.5 text-xs text-[#A8A8B3]">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1 text-[#A8A8B3]">
            <Home className="w-3.5 h-3.5 text-[#A8A8B3]" />
            Trang chủ
          </Link>
          <span className="text-white/30">/</span>
          <Link to="/movies" className="hover:text-white transition-colors text-[#A8A8B3]">
            Phim
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{movieName}</span>
          <span className="text-white/30">/</span>
          <span className="text-[#E50914] font-semibold">Lịch chiếu</span>
        </nav>

        {/* 4-Step Booking Flow Tracker */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 stitch-scrollbar-none">
          {/* Step 1: Active */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E50914] text-white text-[11px] sm:text-xs flex items-center justify-center font-bold shadow-md shadow-[#E50914]/40">
              1
            </div>
            <span className="text-xs sm:text-sm text-white font-bold tracking-tight">Suất chiếu</span>
          </div>
          <div className="w-6 sm:w-8 h-[2px] bg-[#E50914] shadow-sm shadow-[#E50914]/50 shrink-0"></div>

          {/* Step 2: Upcoming */}
          <div className="flex items-center gap-2 shrink-0 opacity-60">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2E2E3C] text-[#A8A8B3] text-[11px] sm:text-xs flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-xs sm:text-sm text-[#A8A8B3]">Chọn ghế</span>
          </div>
          <div className="w-6 sm:w-8 h-[2px] bg-[#2E2E3C] shrink-0 opacity-50"></div>

          {/* Step 3: Upcoming */}
          <div className="flex items-center gap-2 shrink-0 opacity-40">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2E2E3C] text-[#A8A8B3] text-[11px] sm:text-xs flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-xs sm:text-sm text-[#A8A8B3]">Bắp nước</span>
          </div>
          <div className="w-6 sm:w-8 h-[2px] bg-[#2E2E3C] shrink-0 opacity-30"></div>

          {/* Step 4: Upcoming */}
          <div className="flex items-center gap-2 shrink-0 opacity-30">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2E2E3C] text-[#A8A8B3] text-[11px] sm:text-xs flex items-center justify-center font-semibold">
              4
            </div>
            <span className="text-xs sm:text-sm text-[#A8A8B3]">Thanh toán</span>
          </div>
        </div>
      </div>
    </section>
  )
}
