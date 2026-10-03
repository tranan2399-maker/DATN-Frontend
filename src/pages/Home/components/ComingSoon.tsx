import { useState } from 'react';
import { StitchMovie } from '../homeAdapter';
import { ArrowRight, Bell, CheckCircle } from 'lucide-react';

interface Props {
  movies: StitchMovie[];
  onSelectMovie: (movie: StitchMovie) => void;
  onSelectTab: (tab: string) => void;
}

export const ComingSoon = ({ movies, onSelectMovie, onSelectTab }: Props) => {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggle = (id: string, title: string) => {
    setReminders(prev => {
      const next = !prev[id];
      if (next) alert(`Đã bật nhắc nhở cho phim: "${title}"`);
      return { ...prev, [id]: next };
    });
  };

  const list = movies.filter(m => m.status === 'coming_soon');
  if (list.length === 0) return null;

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">Sắp ra mắt</span>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">Phim bom tấn sắp khởi chiếu</h2>
        </div>
        <button onClick={() => onSelectTab('phim')} className="text-xs font-bold text-[#ffb4aa] hover:underline flex items-center gap-1 cursor-pointer">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.slice(0, 3).map(movie => {
          const set = reminders[movie.id];
          return (
            <div key={movie.id} className="bg-[#1F1F23] rounded-2xl overflow-hidden flex flex-col group border border-white/[0.04]">
              <div onClick={() => onSelectMovie(movie)} className="relative w-full aspect-[16/10] overflow-hidden bg-[#1b1b1f] cursor-pointer">
                <img src={movie.backdropUrl || movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F23] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 bg-[#E50914]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded">
                  {movie.releaseDate}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs text-[#ffd484] font-semibold">Khởi chiếu: {movie.releaseDate}</span>
                  <h3 onClick={() => onSelectMovie(movie)} className="text-base font-bold text-white mt-1 group-hover:text-[#ffb4aa] transition-colors cursor-pointer">{movie.title}</h3>
                  {movie.genre.length > 0 && <p className="text-xs text-[#A8A8B3] mt-1">{movie.genre.join(', ')}</p>}
                </div>
                <div className="mt-4 pt-2 border-t border-white/[0.04]">
                  <button onClick={() => toggle(movie.id, movie.title)}
                    className={"w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer " + (set ? "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40" : "bg-[#2A292E] hover:bg-[#353439] text-white")}
                  >
                    {set ? <><CheckCircle className="w-4 h-4" />Đã bật nhắc nhở</> : <><Bell className="w-4 h-4" />Nhắc tôi khi mở bán</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
