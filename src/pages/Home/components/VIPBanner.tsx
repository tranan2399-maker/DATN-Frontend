import React, { useContext } from 'react';
import { Award, CheckCircle2, Crown, Sparkles, Nfc } from 'lucide-react';
import { ContextMain } from '@/context/Context';

interface VIPBannerProps {
  onOpenVipModal: () => void;
}

export const VIPBanner: React.FC<VIPBannerProps> = ({ onOpenVipModal }) => {
  const { userDetail, isLogined } = useContext(ContextMain);

  const userName = isLogined && userDetail?.message?.name
    ? userDetail.message.name.toUpperCase()
    : 'DREAM MEMBER';

  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#17140B] via-[#0E0E12] to-[#14141A] p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#f5b300]/25">
        {/* Glow ambient background */}
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#f5b300]/10 blur-[80px] pointer-events-none" />

        {/* Left Benefit Content */}
        <div className="max-w-[620px] relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#f5b300]/20 text-[#ffd484] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#f5b300]/30">
              <Crown className="w-3.5 h-3.5 text-[#ffd484]" />
              DREAM VIP CLUB
            </span>
            <span className="text-[#A8A8B3] text-xs">Đặc quyền thượng lưu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl text-[#ffd484] font-extrabold tracking-tight">
            TRỞ THÀNH HỘI VIÊN VIP NGAY HÔM NAY
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A8B3] leading-relaxed">
            Nâng tầm trải nghiệm điện ảnh với hệ thống quyền lợi ưu tiên cao cấp nhất dành riêng cho các tín đồ mê phim thực thụ:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffd484] shrink-0" />
              <span>Tích lũy đến 10% giá trị mọi vé</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffd484] shrink-0" />
              <span>Miễn phí đổi vé &amp; nâng hạng ghế</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffd484] shrink-0" />
              <span>Tặng combo bắp nước ngày sinh nhật</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffd484] shrink-0" />
              <span>Vé xem trước suất chiếu đặc biệt</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={onOpenVipModal}
              className="h-12 px-6 rounded-xl bg-[#f5b300] text-[#412d00] text-sm font-bold inline-flex items-center gap-2 shadow-[0_4px_24px_rgba(245,179,1,0.3)] hover:brightness-110 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Award className="w-5 h-5 text-[#412d00]" />
              <span>ĐĂNG KÝ HỘI VIÊN VIP</span>
            </button>
          </div>
        </div>

        {/* Right 3D Membership Card Graphic */}
        <div className="relative z-10 lg:pr-6">
          <div className="relative w-[300px] sm:w-[350px] h-[200px] sm:h-[220px] rounded-2xl bg-gradient-to-tr from-[#1E1B15] via-[#2A261D] to-[#12110D] p-5 sm:p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-between overflow-hidden border border-[#f5b300]/30">
            <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-[#ffd484]/10 blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base text-[#ffd484] font-black tracking-widest uppercase">
                DREAM CINEMA
              </span>
              <Nfc className="w-6 h-6 text-[#ffd484]" />
            </div>

            <div>
              <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-200 to-yellow-500 mb-2.5 opacity-90 shadow-sm" />
              <p className="text-xs sm:text-sm font-mono text-[#ffd484] tracking-widest">
                **** **** **** 8899
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-wider text-[#ffd484]/60">CHỦ THẺ</p>
                <p className="text-xs text-white font-bold uppercase tracking-wider truncate max-w-[170px]">
                  {userName}
                </p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-[#f5b300] text-[#412d00] text-[9px] font-extrabold uppercase shadow-sm">
                  DIAMOND VIP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
