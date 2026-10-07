export function SeatLegendStitch() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3 px-4 bg-[#131317]/80 border border-white/[0.06] rounded-2xl max-w-xl mx-auto text-xs text-[#A8A8B3]">
      {/* Ghế trống */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#1E1E24] border border-white/10" />
        <span>Ghế trống</span>
      </div>

      {/* Ghế đang chọn */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#E50914] border border-[#FFB4AA] shadow-[0_0_8px_rgba(229,9,20,0.6)]" />
        <span className="text-white font-medium">Đang chọn</span>
      </div>

      {/* Ghế VIP */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#2E181B] border border-[#FFD484] shadow-[0_0_8px_rgba(255,212,132,0.2)]" />
        <span className="text-[#FFD484] font-medium">Ghế VIP</span>
      </div>

      {/* Ghế đã đặt / đã bán */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#141418] border border-white/5 opacity-60 flex items-center justify-center text-[10px] text-[#71717A]">
          ✕
        </div>
        <span>Đã đặt</span>
      </div>
    </div>
  )
}
