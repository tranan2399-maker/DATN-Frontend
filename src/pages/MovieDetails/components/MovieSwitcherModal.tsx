import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Film, X, Search } from 'lucide-react'
import { MovieType } from '@/Interface/movie'

interface MovieSwitcherModalProps {
  isOpen: boolean
  onClose: () => void
  movies: MovieType[]
  currentSlug: string
}

export const MovieSwitcherModal: React.FC<MovieSwitcherModalProps> = ({
  isOpen,
  onClose,
  movies,
  currentSlug
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  if (!isOpen) return null

  const filteredMovies = movies.filter((m) =>
    m.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (slug: string) => {
    onClose()
    if (slug !== currentSlug) {
      navigate(`/movie/${slug}`)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14141A] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#E50914]" />
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
              Đổi phim khác đang chiếu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1C1C24] hover:bg-[#252530] text-[#A8A8B3] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/[0.06] bg-[#1C1C24]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A8A8B3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm phim theo tên..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141A] border border-white/[0.08] text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50914] transition-colors"
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto stitch-scrollbar-none grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {filteredMovies.map((movie) => {
            const isCurrent = movie.slug === currentSlug
            return (
              <div
                key={movie._id}
                onClick={() => handleSelect(movie.slug)}
                className={`cursor-pointer group p-2 rounded-xl transition-all border ${
                  isCurrent
                    ? 'bg-[#252530] border-[#E50914] shadow-md shadow-[#E50914]/20'
                    : 'bg-[#1C1C24] hover:bg-[#252530] border-white/[0.05] hover:border-white/[0.15]'
                }`}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[#0B0B0F]">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isCurrent && (
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold">
                      Đang xem
                    </div>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#E50914] transition-colors">
                  {movie.name}
                </h4>
                <p className="text-[11px] text-[#A8A8B3] mt-0.5">
                  {movie.duration ? `${movie.duration} phút` : '120 phút'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
