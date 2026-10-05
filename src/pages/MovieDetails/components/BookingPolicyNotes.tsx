import React from 'react'
import { ShieldCheck, Clock, QrCode } from 'lucide-react'

interface BookingPolicyNotesProps {
  ageLimit?: number
}

export const BookingPolicyNotes: React.FC<BookingPolicyNotesProps> = ({ ageLimit = 13 }) => {
  const ageLabel = ageLimit >= 18 ? 'T18' : ageLimit >= 16 ? 'T16' : ageLimit >= 13 ? 'T13' : 'P'

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 pb-20">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#14141A] border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#E50914]" />
          <h3 className="font-headline text-base sm:text-lg font-bold text-white">
            Lưu ý quan trọng khi đặt vé
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-[#A8A8B3]">
          {/* Card 1: Age */}
          <div className="space-y-1.5 p-4 rounded-xl bg-[#1C1C24] border border-white/[0.05]">
            <p className="font-semibold text-white flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold">
                {ageLabel}
              </span>
              Quy định độ tuổi
            </p>
            <p className="leading-relaxed text-[#A8A8B3]">
              {ageLimit > 0
                ? `Phim dành cho khán giả từ đủ ${ageLimit} tuổi trở lên. Nhân viên rạp chiếu sẽ kiểm tra Căn cước công dân hoặc giấy tờ tùy thân hợp lệ trước khi vào phòng chiếu.`
                : 'Phim phù hợp cho mọi lứa tuổi khán giả. Trẻ em dưới 0.9m được miễn phí vé khi ngồi cùng ghế với người lớn.'}
            </p>
          </div>

          {/* Card 2: Time */}
          <div className="space-y-1.5 p-4 rounded-xl bg-[#1C1C24] border border-white/[0.05]">
            <p className="font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F5B301]" />
              Thời gian có mặt tại rạp
            </p>
            <p className="leading-relaxed text-[#A8A8B3]">
              Quý khách vui lòng có mặt trước giờ chiếu ít nhất 15 phút để nhận bắp nước và ổn định chỗ ngồi. Rạp có quyền từ chối hoàn tiền đối với các trường hợp trễ quá 20 phút.
            </p>
          </div>

          {/* Card 3: M-Ticket */}
          <div className="space-y-1.5 p-4 rounded-xl bg-[#1C1C24] border border-white/[0.05]">
            <p className="font-semibold text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#38BDF8]" />
              Vé điện tử (M-Ticket)
            </p>
            <p className="leading-relaxed text-[#A8A8B3]">
              Không cần in vé giấy. Quý khách chỉ cần xuất trình mã QR trên ứng dụng hoặc tin nhắn SMS trực tiếp tại cửa kiểm soát phòng chiếu để vào xem phim ngay lập tức.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
