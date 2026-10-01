import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Gift, Ticket, Sparkles } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: 'ĐỒNG GIÁ 45K CHO HSSV',
    desc: 'Ưu đãi đặc biệt khi xuất trình thẻ HSSV tại quầy. Áp dụng cho tất cả các suất chiếu 2D từ Thứ 2 đến Thứ 5.',
    bg: 'from-pink-600 to-red-800',
    icon: <Ticket className="w-16 h-16 mb-4 text-white opacity-80" />
  },
  {
    id: 2,
    title: 'SIÊU COMBO MARVEL',
    desc: 'Tặng ngay 1 ly Marvel độc quyền khi mua Combo bắp nước cỡ lớn. Số lượng có hạn, áp dụng trên toàn quốc!',
    bg: 'from-amber-500 to-orange-700',
    icon: <Gift className="w-16 h-16 mb-4 text-white opacity-80" />
  },
  {
    id: 3,
    title: 'THỨ 4 VUI VẺ - NHÂN ĐÔI ĐIỂM',
    desc: 'Giảm 20% cho tất cả thành viên Dream Cinema. Tích điểm x2 cho mọi giao dịch vé và bắp nước mỗi thứ 4 hàng tuần.',
    bg: 'from-indigo-600 to-purple-800',
    icon: <Sparkles className="w-16 h-16 mb-4 text-white opacity-80" />
  }
];

export const PromotionCarousel = () => {
  return (
    <section className="py-16 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-[#eb3656] rounded-sm"></div>
          <h2 className="text-white text-3xl font-bold uppercase tracking-tight">Khuyến Mãi & Sự Kiện</h2>
        </div>

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="rounded-2xl overflow-hidden shadow-2xl group"
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className={`bg-gradient-to-br ${promo.bg} p-8 md:p-16 min-h-[360px] flex items-center relative overflow-hidden transition-all duration-700`}>
                
                {/* Decorative background shapes */}
                <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute left-0 bottom-0 translate-y-1/3 -translate-x-1/4 w-64 h-64 bg-black/20 rounded-full blur-2xl"></div>

                <div className="relative z-10 max-w-2xl">
                  {promo.icon}
                  <h3 className="text-white text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md leading-tight">
                    {promo.title}
                  </h3>
                  <p className="text-white/90 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-xl">
                    {promo.desc}
                  </p>
                  <button className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#eb3656] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
