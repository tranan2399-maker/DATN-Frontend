import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllHasShow } from '@/api/movie';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import {
  buildVNDateTabs,
  formatTimeVN,
  isSameDayVN,
  normalizeShowtimeStatus
} from '@/utils/showtimeHelpers';

export const CinemaShowtimes = () => {
  const navigate = useNavigate();
  const dateTabs = useMemo(() => buildVNDateTabs(7), []);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedTab = dateTabs[selectedIdx];

  const { data: movies, isLoading } = useQuery({
    queryKey: ['HOMEPAGE_SHOWTIMES'],
    queryFn: () => getAllHasShow('')
  });

  // Filter movies that have showtimes on the selected Vietnam date
  const moviesWithShowtimes = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    const targetDate = selectedTab.date;

    return movies
      .map((movie: any) => {
        const showTimes: any[] = movie.showTimes || [];
        const timesOnDay = showTimes
          .filter((st: any) => {
            if (!st?.timeFrom) return false;
            const matchesDay = isSameDayVN(st.timeFrom, targetDate);
            const status = normalizeShowtimeStatus(st.status);
            return matchesDay && status === 'Available';
          })
          .sort((a: any, b: any) => new Date(a.timeFrom).getTime() - new Date(b.timeFrom).getTime());

        return timesOnDay.length > 0 ? { movie, timesOnDay } : null;
      })
      .filter(Boolean);
  }, [movies, selectedTab]);

  // Find nearest date that has showtimes if current selected date is empty
  const nearestDateWithShowtimes = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return null;
    for (let i = 0; i < dateTabs.length; i++) {
      if (i === selectedIdx) continue;
      const tab = dateTabs[i];
      const hasAny = movies.some((movie: any) => {
        return (movie.showTimes || []).some((st: any) => {
          return isSameDayVN(st.timeFrom, tab.date) && normalizeShowtimeStatus(st.status) === 'Available';
        });
      });
      if (hasAny) return { index: i, tab };
    }
    return null;
  }, [movies, dateTabs, selectedIdx]);

  if (isLoading) {
    return (
      <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16 py-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">
            Lịch chiếu
          </span>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">Phim đang có suất chiếu</h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {dateTabs.map((tab, i) => (
            <button
              key={tab.dateString}
              onClick={() => setSelectedIdx(i)}
              className={
                "px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer " +
                (selectedIdx === i
                  ? "bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.35)]"
                  : "bg-[#1F1F23] text-[#A8A8B3] hover:text-white hover:bg-[#2A292E]")
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {moviesWithShowtimes.length === 0 ? (
          <div className="bg-[#1F1F23] rounded-2xl p-8 text-center text-[#A8A8B3] border border-white/[0.04] flex flex-col items-center gap-3">
            <Calendar className="w-10 h-10 text-[#71717A] stroke-[1.5]" />
            <p className="text-sm font-medium text-[#d1d0d7]">
              Chưa có suất chiếu cho ngày {selectedTab.label.toLowerCase()}.
            </p>
            {nearestDateWithShowtimes ? (
              <button
                onClick={() => setSelectedIdx(nearestDateWithShowtimes.index)}
                className="mt-1 px-5 py-2.5 rounded-xl bg-[#2A292E] hover:bg-[#353439] text-[#ffd484] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-[#ffd484]/20"
              >
                <Sparkles className="w-4 h-4 text-[#ffd484]" />
                <span>Xem suất chiếu gần nhất: {nearestDateWithShowtimes.tab.label}</span>
              </button>
            ) : (
              <p className="text-xs text-[#71717A]">
                Vui lòng theo dõi hoặc liên hệ rạp để cập nhật lịch chiếu sớm nhất.
              </p>
            )}
          </div>
        ) : (
          (moviesWithShowtimes as any[]).map(({ movie, timesOnDay }: any) => (
            <div key={movie._id} className="bg-[#1F1F23] rounded-2xl p-4 md:p-6 shadow-md border border-white/[0.04]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-4">
                  {movie.image && (
                    <img src={movie.image} alt={movie.name} className="w-14 h-20 object-cover rounded-xl shrink-0" />
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg text-white font-bold">{movie.name}</h3>
                    <p className="text-xs text-[#A8A8B3] mt-1">
                      {movie.status === 'IS_SHOWING' ? 'Đang chiếu' : movie.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/movie/' + movie.slug)}
                  className="text-xs text-[#ffb4aa] font-bold flex items-center gap-1 hover:underline cursor-pointer shrink-0"
                >
                  Xem chi tiết <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timesOnDay.map((st: any) => {
                  const time = formatTimeVN(st.timeFrom);
                  return (
                    <button
                      key={st._id}
                      onClick={() => navigate('/movie/' + movie.slug)}
                      className="bg-[#1B1B1F] hover:bg-[#2A292E] p-3 rounded-xl flex flex-col text-left transition-colors group cursor-pointer border border-white/[0.04] hover:border-[#E50914]"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-base font-bold text-white group-hover:text-[#E50914] transition-colors">
                          {time}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]">
                          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                          Còn vé
                        </span>
                      </div>
                      <span className="text-xs text-[#A8A8B3] mt-1">Chọn ghế ngay</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
