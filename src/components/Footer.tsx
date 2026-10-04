import { HashLink } from 'react-router-hash-link';
import { Film, Phone, Mail, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react';
import '../pages/Home/home-stitch.css';

export const Footer = () => {
  return (
    <footer className="footer-stitch w-full bg-[#08080B] text-[#e4e1e7] border-t border-[#E50914] pt-12 pb-8 mt-16 selection:bg-[#E50914] selection:text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Hotline */}
          <div className="space-y-4">
            <HashLink to="#headerTop" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#E50914] flex items-center justify-center text-white shadow-[0_0_12px_rgba(229,9,20,0.45)]">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg uppercase tracking-wider text-white group-hover:text-[#ffb4aa] transition-colors">
                DREAM CINEMA
              </span>
            </HashLink>

            <p className="text-xs text-[#A8A8B3] leading-relaxed">
              Trải nghiệm điện ảnh đỉnh cao chuẩn quốc tế với hệ thống phòng chiếu hiện đại và dịch vụ chuẩn VIP hàng đầu Việt Nam.
            </p>

            <div className="space-y-2 text-xs text-[#A8A8B3] pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ffb4aa] shrink-0" />
                <span>Hotline: <strong className="text-white">0363 128 962</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ffb4aa] shrink-0" />
                <span>Email: <strong className="text-white">Dc@gmail.com</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ffb4aa] shrink-0" />
                <span>Đà Nẵng &amp; Toàn quốc</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/longthien.thanthien/?locale=vi_VN"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1F1F24] hover:bg-[#E50914] flex items-center justify-center text-[#A8A8B3] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/%C4%91%E1%BB%A9c-nguy%E1%BB%85n-88a2072a2/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1F1F24] hover:bg-[#0077B5] flex items-center justify-center text-[#A8A8B3] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCrcEXy2YurzCrKN9Ys9XLhA"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#1F1F24] hover:bg-[#FF0000] flex items-center justify-center text-[#A8A8B3] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CÔNG TY */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#ffd484] mb-3">CÔNG TY</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A8B3]">
              <li>
                <HashLink to="/about-us" className="hover:text-white transition-colors">Về chúng tôi</HashLink>
              </li>
              <li>
                <HashLink to="/policy" className="hover:text-white transition-colors">Thỏa thuận sử dụng</HashLink>
              </li>
              <li>
                <HashLink to="/policy" className="hover:text-white transition-colors">Chính sách bảo mật</HashLink>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Quan hệ cổ đông</span>
              </li>
            </ul>
          </div>

          {/* THÔNG TIN */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#ffd484] mb-3">THÔNG TIN</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A8B3]">
              <li>
                <HashLink to="/showtimes" className="hover:text-white transition-colors">Lịch chiếu phim</HashLink>
              </li>
              <li>
                <HashLink to="/movies" className="hover:text-white transition-colors">Phim đang chiếu</HashLink>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Rạp chiếu &amp; Giá vé</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Sự kiện &amp; Tin tức</span>
              </li>
            </ul>
          </div>

          {/* HỖ TRỢ */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#ffd484] mb-3">HỖ TRỢ</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A8B3]">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Hướng dẫn đặt vé</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Câu hỏi thường gặp</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Chính sách hoàn/đổi vé</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Liên hệ ban quản lý</span>
              </li>
            </ul>
          </div>

          {/* GÓP Ý & VIP CLUB */}
          <div className="space-y-3">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#ffd484] mb-3">DREAM VIP CLUB</h4>
            <p className="text-xs text-[#A8A8B3] leading-relaxed">
              Tận hưởng đặc quyền tích lũy điểm thưởng đến 10%, đổi vé miễn phí và quà tặng sinh nhật dành riêng cho hội viên.
            </p>
            <div className="pt-2">
              <HashLink
                to="/profile/forms/account"
                className="inline-block px-4 py-2 rounded-xl bg-[#f5b300] hover:bg-[#ffc11a] text-[#412d00] text-xs font-bold transition-all shadow-md"
              >
                Đăng ký Hội viên
              </HashLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} DREAM CINEMA. Toàn bộ bản quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <HashLink to="/policy" className="hover:text-[#A8A8B3] transition-colors">Điều khoản dịch vụ</HashLink>
            <span>•</span>
            <HashLink to="/policy" className="hover:text-[#A8A8B3] transition-colors">Chính sách thanh toán</HashLink>
            <span>•</span>
            <span className="text-[#A8A8B3]">DATN Dream Cinema</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
