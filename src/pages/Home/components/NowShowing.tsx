import { useState } from 'react';
import { StitchMovie } from '../homeAdapter';
import { Star, Ticket, ArrowRight } from 'lucide-react';

interface Props {
  movies: StitchMovie[];
  onSelectMovie: (movie: StitchMovie) => void;
  onStartBooking: (movie: StitchMovie) => void;
  onSelectTab: (tab: string) => void;
  selectedFormat?: string;
  selectedLanguage?: string;
}

export const NowShowing = ({
  movies,
  onSelectMovie,
  onStartBooking,
  onSelectTab,
  selectedFormat = 'Tất cả',
  selectedLanguage = 'Tất cả',
}: Props) => {
  const [category, setCategory] = useState<'now' | 'coming'>('now');

  // Filter out junk / destroyed movies
  const validMovies = (movies || []).filter((m) => !m.destroy);

  const displayed = validMovies.filter((m) => {
    // 1. Category filter
    if (category === 'coming') {
      if (m.status !== 'coming_soon') return false;
    } else {
      if (m.status !== 'now_showing') return false;
    }

    // 2. Format filter
    if (selectedFormat && selectedFormat !== 'Tất cả') {
      if (!m.formats.includes(selectedFormat)) return false;
    }

    // 3. Language filter
    if (selectedLanguage && selectedLanguage !== 'Tất cả') {
      if (selectedLanguage === 'Phụ đề' && !m.subtitleType.includes('Phụ đề')) return false;
      if (selectedLanguage === 'Lồng tiếng' && !m.subtitleType.includes('Lồng tiếng')) return false;
      if (selectedLanguage === 'Tiếng Việt' && !m.language.includes('Việt') && !m.language.includes('Vietnam')) return false;
      if (selectedLanguage === 'Tiếng Anh' && !m.language.includes('Anh') && !m.language.includes('English') && !m.language.includes('Mỹ')) return false;
      if (selectedLanguage === 'Tiếng Hàn' && !m.language.includes('Hàn') && !m.language.includes('Korea')) return false;
    }

    return true;
  });

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">
            {category === 'now' ? 'Đang chiếu tại rạp' : 'Sắp khởi chiếu'}
          </span>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">
            {category === 'now' ? 'Phim Đang Chiếu' : 'Phim Sắp Chiếu'}
          </h2>
          <p className="text-xs text-[#A8A8B3] mt-1">
            Khám phá các tựa phim đỉnh cao đang chiếu tại cụm rạp Dream Cinema
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-[#1F1F23] rounded-xl p-1 border border-white/[0.06]">
            <button
              onClick={() => setCategory('now')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                category === 'now'
                  ? 'bg-[#2A292E] text-white shadow-sm'
                  : 'text-[#A8A8B3] hover:text-white'
              }`}
            >
              Đang chiếu
            </button>
            <button
              onClick={() => setCategory('coming')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                category === 'coming'
                  ? 'bg-[#2A292E] text-white shadow-sm'
                  : 'text-[#A8A8B3] hover:text-white'
              }`}
            >
              Sắp chiếu
            </button>
          </div>

          <button
            onClick={() => onSelectTab('phim')}
            className="text-xs font-bold text-[#ffb4aa] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {displayed.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="group relative flex flex-col bg-[#1F1F23] rounded-2xl overflow-hidden hover:bg-[#2A292E] transition-all duration-300 border border-white/[0.04]"
          >
            {/* Poster Thumbnail */}
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#1b1b1f]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F23] via-transparent to-transparent opacity-80" />

              {/* Rating Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[#ffd484] text-[11px] font-bold">
                <Star className="w-3 h-3 fill-current text-[#ffd484]" />
                <span>{movie.rating}</span>
              </div>

              {/* Format Badge */}
              {movie.formats.length > 0 && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold shadow-sm">
                  {movie.formats[0]}
                </div>
              )}

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/55 backdrop-blur-[2px] p-2">
                <button
                  onClick={() => onStartBooking(movie)}
                  className="w-full max-w-[140px] py-2 rounded-xl bg-[#E50914] text-white text-xs font-bold hover:bg-[#FF2D3A] transition-all cursor-pointer text-center shadow-lg"
                >
                  Đặt vé ngay
                </button>
                <button
                  onClick={() => onSelectMovie(movie)}
                  className="w-full max-w-[140px] py-1.5 rounded-xl bg-white/[0.15] hover:bg-white/[0.25] text-white text-[11px] font-semibold transition-all cursor-pointer text-center"
                >
                  Chi tiết phim
                </button>
              </div>
            </div>

            {/* Info Footer */}
            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#A8A8B3] text-[11px] mb-1">
                  {movie.ageRating && (
                    <span className="px-1.5 py-0.2 rounded bg-[#353439] text-white font-bold text-[10px]">
                      {movie.ageRating}
                    </span>
                  )}
                  <span>{movie.duration}</span>
                </div>
                <h3
                  onClick={() => onSelectMovie(movie)}
                  className="text-sm font-bold text-white truncate group-hover:text-[#ffb4aa] transition-colors cursor-pointer"
                  title={movie.title}
                >
                  {movie.title}
                </h3>
              </div>

              <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[11px] text-[#A8A8B3]">
                  Từ{' '}
                  <strong className="text-white font-semibold">
                    {movie.startingPrice.toLocaleString('vi-VN')}đ
                  </strong>
                </span>
                <Ticket className="text-[#E50914] w-4 h-4" />
              </div>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 bg-[#15151A] rounded-2xl border border-white/[0.05]">
            <p className="text-sm font-medium">Không tìm thấy phim phù hợp với bộ lọc đã chọn.</p>
            <p className="text-xs text-gray-500 mt-1">Hãy thử đổi định dạng hoặc ngôn ngữ khác.</p>
          </div>
        )}
      </div>
    </section>
  );
};
