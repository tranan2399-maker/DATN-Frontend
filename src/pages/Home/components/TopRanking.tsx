import React from 'react';
import { StitchMovie } from '../homeAdapter';
import { Star } from 'lucide-react';

interface Props {
  movies: StitchMovie[];
  onSelectMovie: (movie: StitchMovie) => void;
}

export const TopRanking: React.FC<Props> = ({ movies, onSelectMovie }) => {
  // 1. Filter out junk and destroyed records
  const validMovies = (movies || []).filter(
    (m) => !m.destroy && m.title !== 'adfghsdf' && m.title !== 'hellomotherfucker'
  );

  // 2. Deduplicate by slug or title
  const seen = new Set<string>();
  const uniqueMovies: StitchMovie[] = [];
  for (const m of validMovies) {
    const key = (m.title || '').trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueMovies.push(m);
    }
  }

  // 3. Sort by rating descending (5 to 1) then title, take top 5
  const ranked = [...uniqueMovies]
    .sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title))
    .slice(0, 5)
    .map((m, i) => ({ ...m, rank: i + 1 }));

  if (ranked.length === 0) return null;

  return (
    <section className="w-full bg-[#0e0e12] py-14 mb-16 border-y border-white/[0.04]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-8">
          <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">
            Xếp hạng tuần
          </span>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">
            Top 5 Phim Ăn Khách Nhất
          </h2>
          <p className="text-xs text-[#A8A8B3] mt-1">
            Những bộ phim được yêu thích nhất dựa trên đánh giá của khán giả Dream Cinema
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {ranked.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="relative group cursor-pointer"
            >
              {/* Poster Container */}
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#1F1F23] shadow-lg border border-white/[0.04]">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[#ffd484] text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-current text-[#ffd484]" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              {/* Massive Outlined Number */}
              <span
                style={{
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                  WebkitTextStroke: movie.rank === 1 ? '2.5px #E50914' : '2px rgba(255, 255, 255, 0.45)',
                  color: 'transparent',
                }}
                className="absolute -bottom-5 -left-3 text-[92px] sm:text-[104px] leading-none font-black select-none pointer-events-none drop-shadow-2xl z-10"
              >
                {movie.rank}
              </span>

              {/* Movie Title & Stats */}
              <div className="mt-4 pl-10">
                <p
                  className="text-xs sm:text-sm text-white font-bold truncate group-hover:text-[#ffb4aa] transition-colors"
                  title={movie.title}
                >
                  {movie.title}
                </p>
                <p className="text-[11px] text-[#A8A8B3] flex items-center gap-1 mt-0.5">
                  <span>Đánh giá:</span>
                  <strong className="text-white font-semibold">{movie.rating}/5 ★</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
