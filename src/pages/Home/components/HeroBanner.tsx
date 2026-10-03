import { useState, useEffect } from 'react';
import { StitchMovie } from '../homeAdapter';
import { Star, Ticket, Play, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Filter out soft-deleted / junk movies
  const validMovies = (movies || []).filter((m) => !m.destroy);
  const nowShowing = validMovies.filter((m) => m.status === 'now_showing');
  const featured = nowShowing.filter((m) => m.isFeatured);
  let heroMovies = featured.length > 0 ? featured : nowShowing.slice(0, 5);
  if (heroMovies.length === 0) heroMovies = validMovies.slice(0, 5);

  const idx = Math.min(currentHeroIndex, Math.max(0, heroMovies.length - 1));
  const h = heroMovies[idx];

  // Auto-advance banner every 8 seconds
  useEffect(() => {
    if (heroMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

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
    <section className="relative w-full h-[620px] md:h-[660px] overflow-hidden bg-[#0e0e12]">
      {/* Cinematic Backdrop */}
      {h.backdropUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url(${h.backdropUrl})` }}
        />
      )}

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/85 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0B0F]/50 to-[#0B0B0F] z-10" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1280px] h-full mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left Column */}
        <div className="max-w-[620px] flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E50914] text-white text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(229,9,20,0.45)]">
              Đang chiếu
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#ffd484]">
              <Star className="w-4 h-4 fill-current text-[#ffd484]" />
              {h.rating}/10 Đánh giá
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[52px] md:leading-[58px] text-white font-extrabold uppercase tracking-tight line-clamp-2">
            {h.title}
          </h1>

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

          <p className="text-xs sm:text-sm text-[#A8A8B3]/90 line-clamp-3 max-w-[540px] pt-1 leading-relaxed">
            {h.synopsis}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={() => onStartBooking(h)}
              className="h-12 px-6 rounded-xl bg-[#E50914] text-white text-sm font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(229,9,20,0.35)] hover:bg-[#FF2D3A] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Ticket className="w-5 h-5" />
              <span>Đặt vé ngay</span>
            </button>

            {onWatchTrailer && h.trailer && (
              <button
                type="button"
                onClick={() => onWatchTrailer(h.trailer)}
                className="h-12 px-5 rounded-xl bg-white/[0.08] text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/[0.16] transition-colors backdrop-blur-md cursor-pointer border border-white/[0.1]"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Xem trailer</span>
              </button>
            )}

            <button
              onClick={() => onSelectMovie(h)}
              className="h-12 px-5 rounded-xl bg-transparent text-[#A8A8B3] hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Chi tiết phim
            </button>
          </div>
        </div>

        {/* Right Column: 3D Floating Tilted Poster */}
        <div className="hidden lg:flex relative items-center justify-center pr-6">
          <div
            onClick={() => onSelectMovie(h)}
            className="relative group transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 cursor-pointer"
          >
            {/* Ambient Red Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#E50914]/40 to-transparent rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-[280px] h-[415px] rounded-2xl overflow-hidden shadow-2xl bg-[#1b1b1f] border border-white/[0.1]">
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
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Dots */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center gap-2">
        <button
          onClick={handlePrev}
          aria-label="Phim trước"
          className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.25] flex items-center justify-center text-white transition-colors cursor-pointer backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {heroMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === idx ? 'w-6 bg-[#E50914]' : 'w-2 bg-white/30'
              }`}
              aria-label={`Chuyển tới slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Phim kế tiếp"
          className="w-8 h-8 rounded-full bg-white/[0.1] hover:bg-white/[0.25] flex items-center justify-center text-white transition-colors cursor-pointer backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
