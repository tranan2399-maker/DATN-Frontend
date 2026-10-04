import { useState, useEffect } from 'react';
import { StitchMovie } from '../homeAdapter';
import { Star, Ticket, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBannerProps {
  movies: StitchMovie[];
  isLoading: boolean;
  onSelectMovie: (movie: StitchMovie) => void;
  onStartBooking: (movie: StitchMovie) => void;
  onWatchTrailer?: (trailerUrl?: string) => void;
}

export const HeroBanner = ({
  movies,
  isLoading,
  onSelectMovie,
  onStartBooking,
  onWatchTrailer,
}: HeroBannerProps) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter out soft-deleted / junk movies
  const validMovies = (movies || []).filter((m) => !m.destroy);
  const nowShowing = validMovies.filter((m) => m.status === 'now_showing');
  const featured = nowShowing.filter((m) => m.isFeatured);
  let heroMovies = featured.length > 0 ? featured : nowShowing.slice(0, 5);
  if (heroMovies.length === 0) heroMovies = validMovies.slice(0, 5);

  const idx = Math.min(currentHeroIndex, Math.max(0, heroMovies.length - 1));
  const h = heroMovies[idx];

  // Auto-advance banner every 8 seconds (pauses when user hovers)
  useEffect(() => {
    if (heroMovies.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroMovies.length, isPaused]);

  const handlePrev = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  };

  const handleNext = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-[620px] md:h-[660px] overflow-hidden bg-[#0e0e12] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!h) return null;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[620px] md:h-[660px] overflow-hidden bg-[#0e0e12] select-none"
    >
      {/* Cinematic Crossfading Backdrops with Ambient Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroMovies.map((movie, i) => (
          <div
            key={movie.id || i}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out will-change-transform ${
              i === idx
                ? 'opacity-35 scale-105 pointer-events-auto mix-blend-luminosity z-0'
                : 'opacity-0 scale-100 pointer-events-none -z-10'
            }`}
            style={{ backgroundImage: `url(${movie.backdropUrl})` }}
          />
        ))}
      </div>

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/85 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0B0F]/50 to-[#0B0B0F] z-10 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1280px] h-full mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left Column: Animated Text & Actions */}
        <div className="max-w-[620px] w-full min-h-[420px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={h.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-3"
            >
              {/* Status Badge & Rating */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E50914] text-white text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(229,9,20,0.45)]">
                  Đang chiếu
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#ffd484]">
                  <Star className="w-4 h-4 fill-current text-[#ffd484]" />
                  {h.rating}/10 Đánh giá
                </span>
              </div>

              {/* Movie Title */}
              <h1 className="text-3xl sm:text-4xl md:text-[54px] md:leading-[60px] text-white font-extrabold uppercase tracking-tight line-clamp-2">
                {h.title}
              </h1>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8A8B3]">
                {h.ageRating && (
                  <span className="px-2 py-0.5 rounded bg-[#2a292e] text-white font-semibold text-xs">
                    {h.ageRating}
                  </span>
                )}
                {h.ageRating && <span>•</span>}
                <span>{h.duration}</span>
                {h.genre.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{h.genre.join(', ')}</span>
                  </>
                )}
                <span>•</span>
                <span>Khởi chiếu: {h.releaseDate}</span>
              </div>

              {/* Formats Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {h.formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-md bg-[#2a292e] text-[11px] text-white font-bold tracking-wider"
                  >
                    {fmt}
                  </span>
                ))}
                {h.subtitleType.map((sub) => (
                  <span
                    key={sub}
                    className="px-2.5 py-1 rounded-md bg-[#1F1F24] border border-white/[0.08] text-[11px] text-[#A8A8B3] font-medium"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-xs sm:text-sm text-[#A8A8B3]/90 line-clamp-3 max-w-[540px] pt-1 leading-relaxed">
                {h.synopsis}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => onStartBooking(h)}
                  className="h-12 px-6 rounded-xl bg-[#E50914] text-white text-sm font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:bg-[#FF2D3A] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Đặt vé ngay</span>
                </button>

                {onWatchTrailer && h.trailer && (
                  <button
                    type="button"
                    onClick={() => onWatchTrailer(h.trailer)}
                    className="h-12 px-5 rounded-xl bg-white/[0.08] text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/[0.16] transition-colors backdrop-blur-md cursor-pointer border border-white/[0.1] active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current text-white" />
                    <span>Xem trailer</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onSelectMovie(h)}
                  className="h-12 px-5 rounded-xl bg-transparent text-[#A8A8B3] hover:text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Chi tiết phim
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: 3D Floating Poster with Silky Motion */}
        <div className="hidden lg:flex relative items-center justify-center pr-6 min-w-[320px] min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={h.id || idx}
              initial={{ opacity: 0, scale: 0.92, rotate: 6, y: 14 }}
              animate={{ opacity: 1, scale: 1, rotate: 3, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotate: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelectMovie(h)}
              className="relative group cursor-pointer"
            >
              {/* Ambient Red Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#E50914]/40 to-transparent rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-[280px] h-[415px] rounded-2xl overflow-hidden shadow-2xl bg-[#1b1b1f] border border-white/[0.1] transform transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <img
                  src={h.posterUrl}
                  alt={h.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  In Cinemas
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Active Progress Dots */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Phim trước"
          className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.25] flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {heroMovies.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setCurrentHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === idx
                  ? 'w-8 bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.7)]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Chuyển tới slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Phim kế tiếp"
          className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.25] flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
