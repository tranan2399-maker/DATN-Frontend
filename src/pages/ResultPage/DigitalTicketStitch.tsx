import { formatVND } from '@/utils'
import { Film, Calendar, MapPin, Armchair, Popcorn, QrCode, Printer, Home, History } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DigitalTicketProps {
  ticketData: {
    name_movie?: string
    image_movie?: string
    cinema_name?: string
    hall_name?: string
    time_from?: string
    seat?: Array<{ name: string; _id: string }>
    foods?: Array<{ name: string; quantity: number; price: number }>
    total?: number
    resultId?: string
  } | null
}

export function DigitalTicketStitch({ ticketData }: DigitalTicketProps) {
  const movieName = ticketData?.name_movie || 'Vé Xem Phim Dream Cinema'
  const cinemaName = ticketData?.cinema_name || 'Dream Cinema Royal'
  const hallName = ticketData?.hall_name || 'Screen 01'
  const showtime = ticketData?.time_from || 'Suất chiếu tiêu chuẩn'
  const seats = ticketData?.seat || []
  const foods = (ticketData?.foods || []).filter((f) => f.quantity > 0)
  const total = ticketData?.total || 0
  const ticketCode = (ticketData?.resultId || 'DC' + Math.floor(10000000 + Math.random() * 90000000)).slice(-8).toUpperCase()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Printable Ticket Stub */}
      <div id="printable-ticket" className="bg-[#18181E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative text-white">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#E50914] to-[#B20710] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-white" />
            <span className="font-extrabold uppercase tracking-widest text-xs font-headline">
              DREAM CINEMA • E-TICKET
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-black/30 text-white text-[11px] font-mono font-bold">
            #{ticketCode}
          </span>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-5">
          {/* Movie Title & Cinema */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-headline text-white leading-tight">
              {movieName}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#ffd484] mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{cinemaName} • {hallName}</span>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#131317] rounded-2xl border border-white/[0.04] text-xs">
            <div>
              <span className="text-[#71717A] text-[11px] block flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Suất chiếu:
              </span>
              <span className="font-semibold text-white mt-0.5 block truncate">
                {showtime}
              </span>
            </div>

            <div>
              <span className="text-[#71717A] text-[11px] block flex items-center gap-1">
                <Armchair className="w-3 h-3" /> Ghế đã đặt:
              </span>
              <span className="font-semibold text-[#ffd484] mt-0.5 block">
                {seats.length > 0 ? seats.map((s) => s.name).join(', ') : 'Ghế tiêu chuẩn'}
              </span>
            </div>
          </div>

          {/* Food items if any */}
          {foods.length > 0 && (
            <div className="p-3 bg-[#131317] rounded-2xl border border-white/[0.04] text-xs space-y-1.5">
              <span className="text-[#71717A] text-[11px] block flex items-center gap-1">
                <Popcorn className="w-3 h-3" /> Combo bắp nước:
              </span>
              {foods.map((f, i) => (
                <div key={i} className="flex justify-between text-[#A8A8B3]">
                  <span>{f.name} x{f.quantity}</span>
                  <span className="text-white font-medium">{formatVND(f.price * f.quantity)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Perforated Divider */}
          <div className="relative my-4">
            <div className="border-t border-dashed border-white/20 w-full" />
            <div className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-[#0D0D11] border border-white/10" />
            <div className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-[#0D0D11] border border-white/10" />
          </div>

          {/* Total & Barcode / QR Simulation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div>
              <span className="text-[11px] text-[#71717A] uppercase tracking-wider block">
                Tổng tiền đã thanh toán:
              </span>
              <span className="text-2xl font-bold font-headline text-[#ffd484]">
                {formatVND(total)}
              </span>
            </div>

            {/* QR Scan stub */}
            <div className="flex items-center gap-3 bg-[#131317] px-3.5 py-2 rounded-xl border border-white/[0.06]">
              <QrCode className="w-9 h-9 text-white shrink-0" />
              <div className="text-[11px] text-[#A8A8B3] leading-tight">
                <span className="block font-semibold text-white">MÃ VÀO RẠP</span>
                <span>Quét mã tại quầy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-[#24242C] hover:bg-[#2F2F3A] border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>In vé / Lưu PDF</span>
        </button>

        <Link
          to="/profile/bill"
          className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#ff1e27] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(229,9,20,0.4)]"
        >
          <History className="w-4 h-4" />
          <span>Lịch sử đặt vé</span>
        </Link>

        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-[#18181E] hover:bg-[#22222A] border border-white/10 text-[#A8A8B3] hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  )
}
