import { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';
import { toast } from 'react-toastify';
import { Film, MapPin, Calendar, Clock, Ticket, Sparkles } from 'lucide-react';
import { StitchMovie } from '../homeAdapter';
import { getOneMovie } from '@/api/movie';
import { MOVIE_DETAIL } from '@/utils/constant';
import { TicketType, ticketAction } from '@/store/ticket';
import { ContextMain } from '@/context/Context';
import { chuyenDoiNgay, convertAmPm, getHourAndMinute } from '@/utils';

interface Props {
  movies: StitchMovie[];
}

export const QuickBookingBar = ({ movies }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail } = useContext(ContextMain);
  const [, setTicket] = useLocalStorage<TicketType | null>('ticket', null);

  const [selectedMovieId, setSelectedMovieId] = useState<string>('');
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>('');

  // 1. Movies list (now showing)
  const nowShowingMovies = useMemo(() => {
    return movies.filter(m => m.status === 'now_showing' || m.status === 'showing');
  }, [movies]);

  // 2. Fetch full movie detail including showTimeCol & moviePriceCol when movie is selected
  const { data: movieDetail, isLoading: isLoadingDetail } = useQuery({
    queryKey: [MOVIE_DETAIL, selectedMovieId],
    queryFn: () => getOneMovie(selectedMovieId),
    enabled: !!selectedMovieId
  });

  // Extract cinemas available for this movie
  const availableCinemas = useMemo(() => {
    if (!movieDetail?.showTimeCol) return [];
    const cinemaMap = new Map<string, { _id: string; CinemaName: string; CinemaAdress: string; name?: string; address?: string }>();
    movieDetail.showTimeCol.forEach((st: any) => {
      const c = st?.cinemaId || st?.screenRoomId?.cinemaId;
      if (c && c._id && !cinemaMap.has(c._id)) {
        cinemaMap.set(c._id, {
          _id: c._id,
          CinemaName: c.CinemaName || c.name || 'Rạp Dream Cinema',
          CinemaAdress: c.CinemaAdress || c.address || '',
          name: c.name || c.CinemaName || 'Rạp Dream Cinema',
          address: c.address || c.CinemaAdress || ''
        });
      }
    });
    return Array.from(cinemaMap.values());
  }, [movieDetail]);

  // Extract distinct dates for selected movie + selected cinema
  const availableDates = useMemo(() => {
    if (!movieDetail?.showTimeCol) return [];
    const dates = new Set<string>();
    movieDetail.showTimeCol.forEach((st: any) => {
      const cId = st?.cinemaId?._id || st?.screenRoomId?.cinemaId?._id;
      if (!selectedCinemaId || cId === selectedCinemaId) {
        if (st.timeFrom) {
          const dateStr = st.timeFrom.split('T')[0];
          dates.add(dateStr);
        }
      }
    });
    return Array.from(dates).sort();
  }, [movieDetail, selectedCinemaId]);

  // Extract showtimes for selected movie + selected cinema + selected date
  const availableShowtimes = useMemo(() => {
    if (!movieDetail?.showTimeCol) return [];
    return movieDetail.showTimeCol.filter((st: any) => {
      const cId = st?.cinemaId?._id || st?.screenRoomId?.cinemaId?._id;
      const matchesCinema = !selectedCinemaId || cId === selectedCinemaId;
      const matchesDate = !selectedDate || (st.timeFrom && st.timeFrom.startsWith(selectedDate));
      return matchesCinema && matchesDate;
    });
  }, [movieDetail, selectedCinemaId, selectedDate]);

  // Handle movie selection change
  const handleMovieChange = (movieId: string) => {
    setSelectedMovieId(movieId);
    setSelectedCinemaId('');
    setSelectedDate('');
    setSelectedShowtimeId('');
  };

  // Handle cinema selection change
  const handleCinemaChange = (cinemaId: string) => {
    setSelectedCinemaId(cinemaId);
    setSelectedDate('');
    setSelectedShowtimeId('');
  };

  // Handle date selection change
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedShowtimeId('');
  };

  // Submit quick booking
  const handleQuickBook = () => {
    if (!selectedMovieId || !selectedCinemaId || !selectedDate || !selectedShowtimeId) {
      toast.warn('Vui lòng chọn đầy đủ Phim, Rạp, Ngày và Suất chiếu để đặt vé!', {
        position: 'top-right'
      });
      return;
    }

    if (userDetail && userDetail.message && userDetail.message.isBlocked) {
      toast.error('Tài khoản của bạn đã bị khóa do vi phạm quy định', {
        position: 'top-right'
      });
      return;
    }

    const showtime = movieDetail?.showTimeCol?.find((st: any) => st._id === selectedShowtimeId);
    if (!showtime) {
      toast.error('Không tìm thấy thông tin suất chiếu đã chọn', { position: 'top-right' });
      return;
    }

    const screenRoom = showtime.screenRoomId || {};
    const cinema = showtime.cinemaId || screenRoom.cinemaId || availableCinemas.find(c => c._id === selectedCinemaId);

    const ticketObject: TicketType = {
      id_showtime: {
        _id: showtime._id,
        timeFrom: showtime.timeFrom
      },
      cinema_name: cinema?.name || cinema?.CinemaName || 'Dream Cinema',
      cinemaId: {
        _id: cinema?._id || selectedCinemaId,
        CinemaName: cinema?.CinemaName || cinema?.name || 'Dream Cinema',
        CinemaAdress: cinema?.CinemaAdress || cinema?.address || '',
        name: cinema?.name || cinema?.CinemaName || 'Dream Cinema',
        address: cinema?.address || cinema?.CinemaAdress || ''
      },
      id_movie: {
        _id: movieDetail._id,
        name: movieDetail.name,
        categoryId: movieDetail.categoryCol || movieDetail.categoryId || [],
        image: movieDetail.image
      },
      hall_name: screenRoom.name || 'Phòng chiếu',
      hall_id: {
        _id: screenRoom._id || '',
        name: screenRoom.name || 'Phòng chiếu'
      },
      image_movie: movieDetail.image,
      name_movie: movieDetail.name,
      duration_movie: movieDetail.duration,
      price_movie: movieDetail.moviePriceCol?.[0]?.price || 75000,
      price_id: movieDetail.moviePriceCol?.[0]?._id || '',
      time_from: showtime.timeFrom
    };

    dispatch(ticketAction.addProperties(ticketObject));
    setTicket(ticketObject);
    navigate('/purchase/seat');
  };

  const isReady = !!(selectedMovieId && selectedCinemaId && selectedDate && selectedShowtimeId);

  return (
    <div className="relative z-30 max-w-[1280px] w-full mx-auto px-4 md:px-6 -mt-8 md:-mt-12 mb-10">
      <div className="bg-[#15151A]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65)] rounded-2xl p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Sparkles className="w-4 h-4 text-[#ffd484]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Đặt vé nhanh</span>
          <span className="text-[11px] text-[#A8A8B3] hidden sm:inline">• Chọn phim, rạp và giờ chiếu trong tích tắc</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* 1. Chọn Phim */}
          <div className="relative flex items-center bg-[#1F1F24] border border-white/[0.06] rounded-xl px-3 py-2.5 hover:border-white/20 transition-colors">
            <Film className="w-4 h-4 text-[#E50914] shrink-0 mr-2.5" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[10px] uppercase font-semibold text-[#A8A8B3]">1. Phim</label>
              <select
                value={selectedMovieId}
                onChange={(e) => handleMovieChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer truncate pr-2 appearance-none w-full"
              >
                <option value="" className="bg-[#1F1F24] text-[#888]">Chọn phim...</option>
                {nowShowingMovies.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#1F1F24] text-white">
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Chọn Rạp */}
          <div className={"relative flex items-center bg-[#1F1F24] border border-white/[0.06] rounded-xl px-3 py-2.5 transition-colors " + (!selectedMovieId ? "opacity-50 cursor-not-allowed" : "hover:border-white/20")}>
            <MapPin className="w-4 h-4 text-[#ffd484] shrink-0 mr-2.5" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[10px] uppercase font-semibold text-[#A8A8B3]">2. Rạp</label>
              <select
                disabled={!selectedMovieId || isLoadingDetail}
                value={selectedCinemaId}
                onChange={(e) => handleCinemaChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer truncate pr-2 appearance-none w-full disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#1F1F24] text-[#888]">
                  {isLoadingDetail ? "Đang tải rạp..." : !selectedMovieId ? "Chọn phim trước" : availableCinemas.length === 0 ? "Chưa có rạp chiếu" : "Chọn rạp..."}
                </option>
                {availableCinemas.map(c => (
                  <option key={c._id} value={c._id} className="bg-[#1F1F24] text-white">
                    {c.name || c.CinemaName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Chọn Ngày */}
          <div className={"relative flex items-center bg-[#1F1F24] border border-white/[0.06] rounded-xl px-3 py-2.5 transition-colors " + (!selectedCinemaId ? "opacity-50 cursor-not-allowed" : "hover:border-white/20")}>
            <Calendar className="w-4 h-4 text-[#60A5FA] shrink-0 mr-2.5" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[10px] uppercase font-semibold text-[#A8A8B3]">3. Ngày chiếu</label>
              <select
                disabled={!selectedCinemaId}
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer truncate pr-2 appearance-none w-full disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#1F1F24] text-[#888]">
                  {!selectedCinemaId ? "Chọn rạp trước" : availableDates.length === 0 ? "Không có lịch chiếu" : "Chọn ngày..."}
                </option>
                {availableDates.map(d => (
                  <option key={d} value={d} className="bg-[#1F1F24] text-white">
                    {chuyenDoiNgay(new Date(d))}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Chọn Suất */}
          <div className={"relative flex items-center bg-[#1F1F24] border border-white/[0.06] rounded-xl px-3 py-2.5 transition-colors " + (!selectedDate ? "opacity-50 cursor-not-allowed" : "hover:border-white/20")}>
            <Clock className="w-4 h-4 text-[#34D399] shrink-0 mr-2.5" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[10px] uppercase font-semibold text-[#A8A8B3]">4. Suất chiếu</label>
              <select
                disabled={!selectedDate}
                value={selectedShowtimeId}
                onChange={(e) => setSelectedShowtimeId(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer truncate pr-2 appearance-none w-full disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#1F1F24] text-[#888]">
                  {!selectedDate ? "Chọn ngày trước" : availableShowtimes.length === 0 ? "Hết suất chiếu" : "Chọn giờ..."}
                </option>
                {availableShowtimes.map((st: any) => (
                  <option key={st._id} value={st._id} className="bg-[#1F1F24] text-white">
                    {convertAmPm(getHourAndMinute(st.timeFrom))} ({st.screenRoomId?.name || 'Phòng'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Nút Đặt Vé */}
          <div className="flex items-center">
            <button
              onClick={handleQuickBook}
              disabled={!isReady}
              className={"w-full h-full min-h-[46px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer " + (isReady ? "bg-[#E50914] hover:bg-[#FF2D3A] text-white shadow-[0_4px_16px_rgba(229,9,20,0.4)]" : "bg-[#2A292E] text-[#71717A] cursor-not-allowed opacity-70")}
            >
              <Ticket className="w-4 h-4" />
              <span>Mua vé ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
