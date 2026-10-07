import React, { useState, useMemo, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { toast } from 'react-toastify'

import { getOneMovie } from '@/api/movie'
import { addWatchList } from '@/api/watchList'
import useWatchList from '@/hooks/useWatchList'
import { MovieType } from '@/Interface/movie'
import { ticketAction, TicketType } from '@/store/ticket'
import { MOVIE_DETAIL, WATCHLIST } from '@/utils/constant'
import { ContextMain } from '@/context/Context'

import { BookingStepTracker } from './BookingStepTracker'
import { MovieBookingHero } from './MovieBookingHero'
import { ShowtimeDateFilterBar, DateItem } from './ShowtimeDateFilterBar'
import { CinemaShowtimeList, ShowtimeItem, CinemaGroup } from './CinemaShowtimeList'
import { SelectedShowtimeDrawer } from './SelectedShowtimeDrawer'
import { BookingPolicyNotes } from './BookingPolicyNotes'
import { MovieSwitcherModal } from './MovieSwitcherModal'
import { TrailerModal } from './TrailerModal'
import { AgeConfirmationDialog } from './AgeConfirmationDialog'

import '../stitchMovieDetails.css'

export interface ShowTimeType {
  screenRoomId: string
  _id: string
  timeFrom: string
  timeTo: string
  date: string
}

export interface ShowTime {
  _id: string
  screenRoomId: {
    _id: string
    name: string
  }
  cinemaId: {
    _id: string
    CinemaName?: string
    CinemaAdress?: string
    name?: string
    address?: string
  }
  status: string
  timeFrom: string
  timeTo: string
  date: string
}

export const MovieInfoSection: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [, setTicket] = useLocalStorage<TicketType>('ticket')
  const movies = useSelector((state: any) => state.movies.movies)
  const { userDetail, isLogined } = useContext(ContextMain)
  const { data: watchListData } = useWatchList(userDetail)

  // State for modals & drawers
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false)
  const [isAgeDialogOpen, setIsAgeDialogOpen] = useState(false)
  const [selectedShowtime, setSelectedShowtime] = useState<ShowtimeItem | null>(null)

  // Filters state
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('ALL')
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>('ALL')
  const [selectedFormat, setSelectedFormat] = useState<string>('Tất cả định dạng')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Phụ đề Việt')

  // Find movie by slug
  const currentMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null
    return movies.find((m: MovieType) => m.slug === slug)
  }, [movies, slug])

  const movieId = currentMovie?._id || ''

  // Fetch full movie details with showtimes
  const { data: dataMovie, isLoading } = useQuery({
    queryKey: [MOVIE_DETAIL, movieId],
    queryFn: () => getOneMovie(movieId),
    enabled: !!movieId
  })

  // Watchlist query & mutation
  const watchListId = useMemo(() => {
    if (!watchListData?.data) return []
    return watchListData.data.map((item: any) => item.movieId?._id)
  }, [watchListData])

  const isWatchlisted = watchListId.includes(movieId)

  const { mutate: mutateWatchlist, isPending: isWatchlistPending } = useMutation({
    mutationFn: (data: { userId: string; movieId: string }) => addWatchList(data),
    onSuccess: () => {
      toast.success('Đã lưu vào danh sách xem sau thành công!', { position: 'top-right' })
      queryClient.invalidateQueries({ queryKey: [WATCHLIST] })
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi lưu phim!', { position: 'top-right' })
    }
  })

  const handleToggleWatchlist = () => {
    if (!userDetail) {
      toast.error('Vui lòng đăng nhập để lưu danh sách xem sau', { position: 'top-right' })
      return
    }
    mutateWatchlist({ movieId, userId: userDetail.message._id })
  }

  // Safe helper to extract local YYYY-MM-DD from Date
  const getLocalDateStr = (d: Date = new Date()): string => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Safe helper to extract YYYY-MM-DD from timeFrom or date
  const parseDateToStr = (timeFromOrDate: string | Date): string => {
    if (!timeFromOrDate) return ''
    if (typeof timeFromOrDate === 'string') {
      const trimmed = timeFromOrDate.trim()
      const datePart = trimmed.split(' ')[0]
      if (datePart.includes('-')) {
        const parts = datePart.split('-')
        if (parts.length === 3) {
          if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`
          if (parts[2].length === 4) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
        }
      }
    }
    try {
      const d = new Date(timeFromOrDate)
      if (!isNaN(d.getTime())) {
        return getLocalDateStr(d)
      }
    } catch {
      // fallback
    }
    return ''
  }

  // Helper kiểm tra suất chiếu có phải là của tương lai (hoặc hôm nay) không
  // TUYỆT ĐỐI BỎ CÁC NGÀY TRƯỚC (PAST DATES)
  const isFutureOrTodayShowtime = (st: any): boolean => {
    const dStr = parseDateToStr(st.timeFrom || st.date)
    if (!dStr) return false
    const todayStr = getLocalDateStr(new Date())

    // 1. Nếu ngày chiếu nhỏ hơn hôm nay -> BỎ HOÀN TOÀN
    if (dStr < todayStr) return false

    // 2. Nếu là ngày hôm nay, kiểm tra xem giờ chiếu đã trôi qua quá 15 phút chưa
    if (dStr === todayStr && st.timeFrom) {
      try {
        let stTime: Date | null = null
        if (typeof st.timeFrom === 'string' && st.timeFrom.includes(' ')) {
          const [datePart, timePart] = st.timeFrom.trim().split(' ')
          const [d, m, y] = datePart.split('-')
          const [hh, mm] = timePart.split(':')
          stTime = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm))
        } else {
          stTime = new Date(st.timeFrom)
        }
        if (stTime && !isNaN(stTime.getTime())) {
          const now = new Date()
          if (stTime.getTime() < now.getTime() - 15 * 60 * 1000) {
            return false // Suất chiếu đã trôi qua trong ngày hôm nay
          }
        }
      } catch {
        // fallback
      }
    }

    return true
  }

  // Count showtimes per date (CHỈ ĐẾM CÁC SUẤT CHIẾU TƯƠNG LAI)
  const showtimeCountsByDate = useMemo(() => {
    const map = new Map<string, number>()
    const showtimes = dataMovie?.showTimeCol || []
    showtimes.forEach((st: any) => {
      if (isFutureOrTodayShowtime(st)) {
        const dStr = parseDateToStr(st.timeFrom || st.date)
        if (dStr) {
          map.set(dStr, (map.get(dStr) || 0) + 1)
        }
      }
    })
    return map
  }, [dataMovie?.showTimeCol])

  // Generate Date Items list: CHỈ LẤY CÁC NGÀY TỪ HÔM NAY TRỞ ĐI (TƯƠNG LAI)
  const dateOptions: DateItem[] = useMemo(() => {
    const datesMap = new Map<string, DateItem>()
    const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const today = new Date()
    const todayStr = getLocalDateStr(today)

    // 1. Chỉ thêm các ngày từ showTimeCol NẾU LÀ NGÀY TƯƠNG LAI (dStr >= todayStr)
    const showtimes = dataMovie?.showTimeCol || []
    showtimes.forEach((st: any) => {
      if (isFutureOrTodayShowtime(st)) {
        const dStr = parseDateToStr(st.timeFrom || st.date)
        if (dStr && dStr >= todayStr && !datesMap.has(dStr)) {
          const dObj = new Date(dStr + 'T00:00:00')
          const isToday = dStr === todayStr
          const dayOfWeek = isToday ? 'Hôm nay' : dayNames[dObj.getDay()]
          const count = showtimeCountsByDate.get(dStr) || 0
          datesMap.set(dStr, {
            date: dObj,
            dateStr: dStr,
            dayOfWeek,
            dayNum: String(dObj.getDate()).padStart(2, '0'),
            monthNum: String(dObj.getMonth() + 1).padStart(2, '0'),
            hasShowtimes: count > 0,
            showtimesCount: count
          })
        }
      }
    })

    // 2. Thêm 14 ngày tiếp theo từ hôm nay (upcoming 14 days)
    for (let i = 0; i < 14; i++) {
      const nextDate = new Date()
      nextDate.setDate(today.getDate() + i)
      const dStr = getLocalDateStr(nextDate)
      if (!datesMap.has(dStr)) {
        const isToday = i === 0
        const isTomorrow = i === 1
        const dayOfWeek = isToday ? 'Hôm nay' : isTomorrow ? 'Ngày mai' : dayNames[nextDate.getDay()]
        const count = showtimeCountsByDate.get(dStr) || 0
        datesMap.set(dStr, {
          date: nextDate,
          dateStr: dStr,
          dayOfWeek,
          dayNum: String(nextDate.getDate()).padStart(2, '0'),
          monthNum: String(nextDate.getMonth() + 1).padStart(2, '0'),
          hasShowtimes: count > 0,
          showtimesCount: count
        })
      }
    }

    // Sắp xếp các ngày theo thứ tự thời gian tăng dần bắt đầu từ hôm nay
    const all = Array.from(datesMap.values())
    return all.sort((a, b) => a.dateStr.localeCompare(b.dateStr))
  }, [dataMovie?.showTimeCol, showtimeCountsByDate])

  // Tự động chọn ngày đầu tiên có suất chiếu tương lai, hoặc mặc định là Hôm nay
  useEffect(() => {
    if (dateOptions.length > 0) {
      const todayStr = getLocalDateStr(new Date())
      // Tìm ngày tương lai có suất chiếu
      const dateWithShow = dateOptions.find((d) => d.hasShowtimes && d.dateStr >= todayStr)
      if (dateWithShow) {
        setSelectedDate(dateWithShow.dateStr)
      } else if (!selectedDate || selectedDate < todayStr) {
        // Mặc định chọn Hôm nay
        setSelectedDate(dateOptions[0].dateStr)
      }
    }
  }, [dateOptions])

  // Find nearest date with showtimes if current selected date has 0
  const availableDateWithShowtimes = useMemo(() => {
    const firstWithShow = dateOptions.find((d) => d.hasShowtimes && d.dateStr !== selectedDate)
    if (!firstWithShow) return null
    return {
      dateStr: firstWithShow.dateStr,
      label: `${firstWithShow.dayNum}/${firstWithShow.monthNum}`,
      count: firstWithShow.showtimesCount || 0
    }
  }, [dateOptions, selectedDate])

  // Extract Cinema Options from showTimeCol (CHỈ LẤY CÁC RẠP CÓ SUẤT CHIẾU TƯƠNG LAI)
  const cinemaOptions = useMemo(() => {
    const list: Array<{ id: string; name: string }> = []
    const seen = new Set<string>()
    const showtimes = dataMovie?.showTimeCol || []

    showtimes.forEach((st: any) => {
      if (isFutureOrTodayShowtime(st)) {
        const cid = st.cinemaId?._id || st.screenRoomId?.CinemaId?._id
      const cname =
        st.cinemaId?.name ||
        st.cinemaId?.CinemaName ||
        st.screenRoomId?.CinemaId?.CinemaName ||
        st.screenRoomId?.CinemaId?.name ||
        ''
      if (cid && cname && !seen.has(cid)) {
        seen.add(cid)
        list.push({ id: cid, name: cname })
      }
      }
    })
    return list
  }, [dataMovie?.showTimeCol])

  // Group showtimes by Cinema and Room based on filters
  const { cinemaGroups, totalShowtimesCount } = useMemo(() => {
    if (!dataMovie?.showTimeCol || !selectedDate) {
      return { cinemaGroups: [], totalShowtimesCount: 0 }
    }

    const priceDefault = dataMovie.moviePriceCol?.[0]?.price || 120000
    const priceIdDefault = dataMovie.moviePriceCol?.[0]?._id || ''
    let totalCount = 0

    // Filter showtimes (CHỈ LẤY CÁC SUẤT CHIẾU TƯƠNG LAI, KHÔNG LẤY CÁC NGÀY TRƯỚC)
    const filteredShowtimes = dataMovie.showTimeCol.filter((st: any) => {
      // 0. Bỏ tất cả các suất chiếu thuộc ngày trước hoặc đã trôi qua
      if (!isFutureOrTodayShowtime(st)) return false

      // 1. Date filter
      const stDateStr = parseDateToStr(st.timeFrom || st.date)
      if (stDateStr !== selectedDate) return false

      // 2. Cinema filter
      const cinemaId = st.cinemaId?._id || st.screenRoomId?.CinemaId?._id
      if (selectedCinemaId !== 'ALL' && cinemaId !== selectedCinemaId) return false

      // 3. City filter
      if (selectedCity !== 'ALL') {
        const address =
          st.cinemaId?.address ||
          st.cinemaId?.CinemaAdress ||
          st.screenRoomId?.CinemaId?.CinemaAdress ||
          st.screenRoomId?.CinemaId?.address ||
          ''
        const normalized = address.toLowerCase()
        if (selectedCity === 'Hà Nội' && !normalized.includes('hà nội') && !normalized.includes('hn')) return false
        if (selectedCity === 'Hồ Chí Minh' && !normalized.includes('hồ chí minh') && !normalized.includes('hcm') && !normalized.includes('quận 1') && !normalized.includes('bình thạnh')) return false
        if (selectedCity === 'Đà Nẵng' && !normalized.includes('đà nẵng') && !normalized.includes('da nang')) return false
      }

      // 4. Format filter
      if (selectedFormat !== 'Tất cả định dạng') {
        const roomName = (st.screenRoomId?.name || '').toLowerCase()
        if (selectedFormat === 'IMAX Laser' && !roomName.includes('imax')) return false
        if (selectedFormat === 'ScreenX' && !roomName.includes('screenx')) return false
        if (selectedFormat === '4DX' && !roomName.includes('4dx')) return false
        if (selectedFormat === '2D Tiêu chuẩn' && (roomName.includes('imax') || roomName.includes('screenx') || roomName.includes('4dx'))) return false
      }

      return true
    })

    // Grouping
    const cinemaMap = new Map<string, CinemaGroup>()
    const flatDim = (dataMovie.showTimeDimension || []).flat()

    filteredShowtimes.forEach((st: any) => {
      totalCount++
      const cId = st.cinemaId?._id || st.screenRoomId?.CinemaId?._id || 'unknown_cinema'
      const cName =
        st.cinemaId?.name ||
        st.cinemaId?.CinemaName ||
        st.screenRoomId?.CinemaId?.CinemaName ||
        st.screenRoomId?.CinemaId?.name ||
        'Dream Cinema'
      const cAddress =
        st.cinemaId?.address ||
        st.cinemaId?.CinemaAdress ||
        st.screenRoomId?.CinemaId?.CinemaAdress ||
        st.screenRoomId?.CinemaId?.address ||
        'Việt Nam'

      if (!cinemaMap.has(cId)) {
        // Determine badge and amenities
        let badge = 'Standard Luxe'
        let amenities = ['Âm thanh vòm Dolby Atmos', 'Ghế bọc da êm ái', 'Bãi đỗ xe ô tô']
        let distance = '2.4 km'

        if (cName.includes('Bà Triệu')) {
          badge = 'Flagship Luxe'
          amenities = ['IMAX Laser 4K', 'Dolby Atmos 64 kênh', 'Ghế VIP Da Nằm Recliner', 'Popcorn Gourmet Bar']
          distance = '2.4 km'
        } else if (cName.includes('Tây Hồ')) {
          badge = 'ScreenX & 4DX'
          amenities = ['Phòng chiếu ScreenX 270°', '4DX Motion Effects', 'VIP Lounge Riêng Biệt']
          distance = '4.3 km'
        } else if (cName.includes('Landmark 81')) {
          badge = 'VIP Suite & IMAX'
          amenities = ['Giường nằm VIP Bed', 'Phục vụ ẩm thực tại chỗ', 'Dolby Atmos Audio']
          distance = '5.8 km'
        } else if (cName.includes('Saigon Centre')) {
          badge = 'Diamond Suite'
          amenities = ['Ghế đôi Sweetbox', 'Dolby Surround 7.1', 'Quầy Bar Cocktails']
          distance = '3.1 km'
        } else if (cName.includes('BHD')) {
          badge = 'Premier Center'
          amenities = ['Laser 4K Christie', 'Âm thanh vòm sống động', 'Check-in nhanh QR']
          distance = '1.8 km'
        }

        cinemaMap.set(cId, {
          cinemaId: cId,
          cinemaName: cName,
          cinemaAddress: cAddress,
          badge,
          amenities,
          rating: '4.9',
          distance,
          rooms: []
        })
      }

      const group = cinemaMap.get(cId)!
      const rId = st.screenRoomId?._id || 'unknown_room'
      const rName = st.screenRoomId?.name || 'Phòng chiếu tiêu chuẩn'

      // Determine room format
      let rFormat = '2D DOLBY ATMOS'
      const rLower = rName.toLowerCase()
      if (rLower.includes('imax')) rFormat = 'IMAX 3D LASER'
      else if (rLower.includes('screenx')) rFormat = 'SCREENX 270° BA MẶT MÀN'
      else if (rLower.includes('4dx')) rFormat = '4DX MOTION CHAIRS'

      let room = group.rooms.find((r) => r.roomId === rId)
      if (!room) {
        room = {
          roomId: rId,
          roomName: rName,
          format: rFormat,
          showtimes: []
        }
        group.rooms.push(room)
      }

      // Match with showTimeDimension to get the real MongoDB _id
      const matchedShowtime = flatDim.find((d: any) => {
        const dRoomId = d.screenRoomId?._id || d.screenRoomId
        return String(dRoomId) === String(rId) && d.timeFrom === st.timeFrom
      })
      const realShowtimeId = matchedShowtime?._id || st._id || st.id || ""

      room.showtimes.push({
        _id: realShowtimeId,
        timeFrom: st.timeFrom,
        timeTo: st.timeTo || matchedShowtime?.timeTo || st.timeFrom || '',
        date: st.date,
        screenRoomId: {
          _id: rId,
          name: rName
        },
        cinemaId: {
          _id: cId,
          name: cName,
          CinemaName: cName,
          address: cAddress,
          CinemaAdress: cAddress
        },
        format: rFormat,
        price: priceDefault,
        price_id: priceIdDefault,
        availableSeats: Math.floor(Math.random() * 45) + 15
      })
    })

    return { cinemaGroups: Array.from(cinemaMap.values()), totalShowtimesCount: totalCount }
  }, [dataMovie, selectedDate, selectedCity, selectedCinemaId, selectedFormat])

  // Format the selected date for display
  const selectedDateFormatted = useMemo(() => {
    const item = dateOptions.find((d) => d.dateStr === selectedDate)
    if (!item) return selectedDate
    return `${item.dayOfWeek} (${item.dayNum}/${item.monthNum})`
  }, [dateOptions, selectedDate])

  // Handle select showtime slot
  const handleSelectSlot = (slot: ShowtimeItem) => {
    setSelectedShowtime(slot)
  }

  // Handle proceed booking button
  const handleProceedBooking = () => {
    if (!selectedShowtime) return

    if (userDetail && userDetail.message?.isBlocked) {
      toast.error('Tài khoản của bạn đã bị khóa do vi phạm quy định', { position: 'top-right' })
      return
    }

    const ageLimit = dataMovie?.age_limit || 0
    if (ageLimit > 0) {
      setIsAgeDialogOpen(true)
    } else {
      executeNavigateToSeat()
    }
  }

  // Confirm booking & navigate to seat page
  const executeNavigateToSeat = () => {
    if (!selectedShowtime || !dataMovie) return

    const ticketObject: TicketType = {
      id_showtime: {
        _id: selectedShowtime._id,
        timeFrom: selectedShowtime.timeFrom,
        timeTo: selectedShowtime.timeTo || selectedShowtime.timeFrom || ''
      },
      cinema_name:
        selectedShowtime.cinemaId.name ||
        selectedShowtime.cinemaId.CinemaName ||
        'Dream Cinema',
      cinemaId: {
        _id: selectedShowtime.cinemaId._id,
        CinemaName:
          selectedShowtime.cinemaId.CinemaName ||
          selectedShowtime.cinemaId.name ||
          '',
        CinemaAdress:
          selectedShowtime.cinemaId.CinemaAdress ||
          selectedShowtime.cinemaId.address ||
          '',
        name:
          selectedShowtime.cinemaId.name ||
          selectedShowtime.cinemaId.CinemaName ||
          '',
        address:
          selectedShowtime.cinemaId.address ||
          selectedShowtime.cinemaId.CinemaAdress ||
          ''
      },
      id_movie: {
        _id: movieId,
        name: dataMovie.name,
        categoryId: dataMovie.categoryCol || [],
        image: dataMovie.image
      },
      hall_name: selectedShowtime.screenRoomId.name,
      hall_id: {
        _id: selectedShowtime.screenRoomId._id,
        name: selectedShowtime.screenRoomId.name
      },
      image_movie: dataMovie.image,
      name_movie: dataMovie.name,
      duration_movie: dataMovie.duration,
      price_movie: selectedShowtime.price,
      price_id: selectedShowtime.price_id,
      time_from: selectedShowtime.timeFrom
    }

    dispatch(ticketAction.addProperties(ticketObject))
    setTicket(ticketObject)
    // Cho phép đặt vé không cần đăng nhập
    navigate('/purchase/seat')
  }

  // Loading Skeleton
  if (isLoading || !dataMovie) {
    return (
      <div className="stitch-movie-details-scope min-h-[600px] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#E50914] border-t-transparent animate-spin"></div>
        <p className="text-sm font-semibold text-[#A8A8B3] tracking-wide">
          Đang tải thông tin phim & lịch chiếu chuẩn VIP...
        </p>
      </div>
    )
  }

  return (
    <div className="stitch-movie-details-scope">
      {/* 1. Breadcrumbs & 4-Step Booking Tracker */}
      <BookingStepTracker movieName={dataMovie.name} />

      {/* 2. Movie Mini Hero Banner */}
      <MovieBookingHero
        movie={dataMovie}
        isWatchlisted={isWatchlisted}
        isWatchlistPending={isWatchlistPending}
        onToggleWatchlist={handleToggleWatchlist}
        onOpenTrailer={() => setIsTrailerOpen(true)}
        onOpenMovieSwitcher={() => setIsSwitcherOpen(true)}
      />

      {/* 3. Sticky Date Strip Carousel & Multi-filter Bar */}
      <ShowtimeDateFilterBar
        dates={dateOptions}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        selectedCinemaId={selectedCinemaId}
        onSelectCinemaId={setSelectedCinemaId}
        cinemaOptions={cinemaOptions}
        selectedFormat={selectedFormat}
        onSelectFormat={setSelectedFormat}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      {/* 4. Cinema & Showtime Listings */}
      <CinemaShowtimeList
        cinemaGroups={cinemaGroups}
        selectedShowtimeId={selectedShowtime?._id || null}
        onSelectShowtime={handleSelectSlot}
        selectedDateFormatted={selectedDateFormatted}
        totalShowtimesCount={totalShowtimesCount}
        onResetFilters={() => {
          setSelectedCity('ALL')
          setSelectedCinemaId('ALL')
          setSelectedFormat('Tất cả định dạng')
        }}
        availableDateWithShowtimes={availableDateWithShowtimes}
        onSelectSpecificDate={(dStr) => setSelectedDate(dStr)}
      />

      {/* 5. Booking Policies & Important Notes */}
      <BookingPolicyNotes ageLimit={dataMovie.age_limit} />

      {/* 6. Sticky Floating Bottom Action Bar */}
      <SelectedShowtimeDrawer
        selectedShowtime={selectedShowtime}
        dateFormatted={selectedDateFormatted}
        onProceedBooking={handleProceedBooking}
      />

      {/* Modals */}
      <MovieSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        movies={movies || []}
        currentSlug={slug || ''}
      />

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={dataMovie.trailer}
        movieName={dataMovie.name}
      />

      <AgeConfirmationDialog
        isOpen={isAgeDialogOpen}
        onClose={() => setIsAgeDialogOpen(false)}
        onConfirm={() => {
          setIsAgeDialogOpen(false)
          executeNavigateToSeat()
        }}
        ageLimit={dataMovie.age_limit}
      />
    </div>
  )
}
