import React from 'react';
import { MonitorPlay, Volume2, Armchair, ArrowRight } from 'lucide-react';

interface ImmersionCardsProps {
  onSelectTab: (tab: string) => void;
  onOpenVipModal: () => void;
}

export const ImmersionCards: React.FC<ImmersionCardsProps> = ({ onSelectTab, onOpenVipModal }) => {
  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="text-center max-w-[700px] mx-auto mb-8">
        <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-2">
          Trải nghiệm vượt trội
        </span>
        <h2 className="text-2xl sm:text-3xl text-white font-bold mb-2">
          Trải nghiệm điện ảnh theo cách chưa từng có
        </h2>
        <p className="text-xs sm:text-sm text-[#A8A8B3]">
          Công nghệ chiếu phim và âm thanh đỉnh cao dẫn đầu xu hướng thế giới, đánh thức toàn bộ giác quan của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1: IMAX Laser */}
        <div className="relative rounded-[20px] overflow-hidden bg-[#1F1F23] p-6 flex flex-col justify-end min-h-[380px] group shadow-xl border border-white/[0.06]">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-30"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0WJ01NVIt0Oq-1eom_uTS_jOL5mkFvG63KSbRGt7lGcEyKccd7tM7f_ZuNVnHRZ46ksVs5XX_N4dlzVc0N9Qi4OQRmxriJoXciCxbTsOk5Awv6wNpuS2W9sn1Y5iwuqfxnJ4wnUdRlzEi_q6n5pwxdKxl9u2TZGxTW-ELjaKQNBJNuZ2VXrP2CD5PPouR5PX3DAaQ-P2Bvt7PPyD1drPb5gXA2gDfQDgYmE6SAiOvrGTzxsb3bx2mQA')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-[#14141A]/70 to-transparent" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#E50914]/20 text-[#E50914] flex items-center justify-center mb-1">
              <MonitorPlay className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold">IMAX Laser 4K</h3>
            <p className="text-xs text-[#A8A8B3] leading-relaxed">
              Độ sắc nét vượt trội, tỷ lệ khung hình mở rộng tới 26% cùng dàn âm thanh 12 kênh sống động chuẩn Hollywood.
            </p>
            <button
              onClick={() => onSelectTab('rap')}
              className="text-xs text-[#ffb4aa] font-bold flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
            >
              <span>Khám phá phòng IMAX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature 2: Dolby Atmos */}
        <div className="relative rounded-[20px] overflow-hidden bg-[#1F1F23] p-6 flex flex-col justify-end min-h-[380px] group shadow-xl border border-white/[0.06]">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-30"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbmOqQ52E38L3PXfruKIdrCyW0JcmZvnRsckkxqWAlnz5LHfo-y-UxueamxYko4UnQfpydun0JI1fKx2bSOZPvAGZAeEsM9cIdPZRbNGk8MQP-FeX_wygPSgZ7Hy4MglSoMpyogCgtIfmEJQ-IQSrUU6og_37aPwXDq6J4ToONKKf2QLMWajUGlunfB13ZPddxj0lNDavav-77Jd1CQSF5NUBM0_CrzcljhBMFV9ifgqkIor0y2fqjxw')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-[#14141A]/70 to-transparent" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#E50914]/20 text-[#E50914] flex items-center justify-center mb-1">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold">Dolby Atmos 360°</h3>
            <p className="text-xs text-[#A8A8B3] leading-relaxed">
              Âm thanh vòm đa chiều lấp đầy toàn bộ khán phòng, chân thực đến từng tiếng thở và rung động xung quanh bạn.
            </p>
            <button
              onClick={() => onSelectTab('lich-chieu')}
              className="text-xs text-[#ffb4aa] font-bold flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
            >
              <span>Tìm suất chiếu Atmos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature 3: LUXE & VIP */}
        <div className="relative rounded-[20px] overflow-hidden bg-[#1F1F23] p-6 flex flex-col justify-end min-h-[380px] group shadow-xl border border-white/[0.06]">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-30"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmT6wZmyLQBvD-PyGsnjMfbJ6DXV94sigZAw5S2Q5V62CHXiCx4_wGv8hRq9H2AqNEIPCKOi04QpG2sg7LzKWdlfUYO_HYvWFwo0T8QyGSIM33isp2LcjZ9VCPgemuY93gi51Zx5DVA4QMGHoOVWgjBgCPJildLs9v8MTQB8ZlP6qvCSssRmjumPaJZ1jb24ylSc_r1wdy-wVBZ0CcS4I2clE9AgHfYoHY7i8Yubg4Vo1kDHuknYW8Ug')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-[#14141A]/70 to-transparent" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-xl bg-[#ffd484]/20 text-[#ffd484] flex items-center justify-center mb-1">
              <Armchair className="w-6 h-6" />
            </div>
            <h3 className="text-xl text-white font-bold">Dream LUXE &amp; VIP Lounge</h3>
            <p className="text-xs text-[#A8A8B3] leading-relaxed">
              Ghế da chỉnh điện ngả 180°, phục vụ ẩm thực thượng hạng tại chỗ, sảnh chờ thương gia biệt lập đẳng cấp.
            </p>
            <button
              onClick={onOpenVipModal}
              className="text-xs text-[#ffd484] font-bold flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform cursor-pointer text-left"
            >
              <span>Khám phá LUXE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
