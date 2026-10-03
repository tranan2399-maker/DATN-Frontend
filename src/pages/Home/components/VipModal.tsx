import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, CheckCircle, ShieldCheck, Crown, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipModal = ({ isOpen, onClose }: VipModalProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    onClose();
    navigate('/profile/forms/account');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[650px] w-[95vw] bg-[#141418] border border-[#f5b300]/30 text-white p-0 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header with Luxury Amber Gradient */}
        <div className="relative p-6 bg-gradient-to-r from-[#2A2312] via-[#1E190D] to-[#141418] border-b border-[#f5b300]/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f5b300]/20 text-[#ffd484] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-[#ffd484]" />
              DREAM VIP CLUB
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-[#ffd484] tracking-tight">
            NÂNG TẦM TRẢI NGHIỆM ĐIỆN ẢNH THƯỢNG LƯU
          </DialogTitle>
          <p className="text-xs text-[#A8A8B3] mt-1">
            Gia nhập cộng đồng hội viên cao cấp để nhận vô vàn ưu đãi và đặc quyền độc quyền tại Dream Cinema.
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Silver Tier */}
            <div className="p-3.5 rounded-xl bg-[#1C1C22] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A8A8B3] block mb-1">Hạng Bạc</span>
                <h4 className="text-sm font-bold text-white">SILVER</h4>
                <p className="text-[11px] text-[#A8A8B3] mt-2">Dành cho thành viên mới bắt đầu tích lũy</p>
              </div>
              <ul className="text-[11px] space-y-1.5 mt-3 text-[#d1d0d7]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ffd484] shrink-0" /> Tích lũy 5% chi tiêu
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ffd484] shrink-0" /> Quà tặng sinh nhật
                </li>
              </ul>
            </div>

            {/* Gold Tier */}
            <div className="p-3.5 rounded-xl bg-[#231F14] border border-[#f5b300]/30 flex flex-col justify-between relative shadow-lg">
              <span className="absolute -top-2 right-3 px-2 py-0.5 rounded bg-[#f5b300] text-[#412d00] text-[9px] font-black uppercase">
                Phổ biến
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#ffd484] block mb-1">Hạng Vàng</span>
                <h4 className="text-sm font-bold text-[#ffd484]">GOLD VIP</h4>
                <p className="text-[11px] text-[#A8A8B3] mt-2">Từ 500 điểm tích lũy trong năm</p>
              </div>
              <ul className="text-[11px] space-y-1.5 mt-3 text-[#f2efe6]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ffd484] shrink-0" /> Tích lũy 8% chi tiêu
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ffd484] shrink-0" /> 1 Combo bắp nước/tháng
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#ffd484] shrink-0" /> Miễn phí đổi vé
                </li>
              </ul>
            </div>

            {/* Diamond Tier */}
            <div className="p-3.5 rounded-xl bg-[#251D2A] border border-[#d8b4fe]/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#d8b4fe] block mb-1">Hạng Kim Cương</span>
                <h4 className="text-sm font-bold text-[#d8b4fe]">DIAMOND VIP</h4>
                <p className="text-[11px] text-[#A8A8B3] mt-2">Đặc quyền thượng đỉnh không giới hạn</p>
              </div>
              <ul className="text-[11px] space-y-1.5 mt-3 text-[#f0e6f6]">
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d8b4fe] shrink-0" /> Tích lũy 10% chi tiêu
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d8b4fe] shrink-0" /> Phòng chờ VIP Lounge
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d8b4fe] shrink-0" /> Vé chiếu sớm đặc biệt
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-[#1C1C22] rounded-xl flex items-center gap-3 border border-white/[0.04]">
            <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
            <p className="text-xs text-[#A8A8B3]">
              Hội viên được nâng hạng tự động ngay khi đủ tích lũy chi tiêu vé và dịch vụ F&amp;B tại toàn bộ hệ thống rạp.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#101014] border-t border-white/[0.06] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A8A8B3] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handleRegister}
            className="px-6 py-2.5 rounded-xl bg-[#f5b300] hover:bg-[#ffc11a] text-[#412d00] text-xs font-bold shadow-[0_4px_16px_rgba(245,179,1,0.35)] transition-all cursor-pointer"
          >
            Đăng ký / Xem tài khoản
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
