import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const promotions = [
  {
    id: 1,
    title: 'ĐỒNG GIÁ 45K CHO HỌC SINH SINH VIÊN',
    desc: 'Ưu đãi đặc biệt khi xuất trình thẻ HSSV tại quầy. Áp dụng cho tất cả các suất chiếu 2D từ Thứ 2 đến Thứ 5.',
    bgColor: 'linear-gradient(135deg, #eb3656 0%, #900C3F 100%)',
    icon: '🎓'
  },
  {
    id: 2,
    title: 'SIÊU COMBO MARVEL',
    desc: 'Tặng ngay 1 ly Marvel độc quyền khi mua Combo bắp nước cỡ lớn. Số lượng có hạn!',
    bgColor: 'linear-gradient(135deg, #FFC300 0%, #FF5733 100%)',
    icon: '🍿'
  },
  {
    id: 3,
    title: 'NGÀY HỘI THÀNH VIÊN - THỨ 4 VUI VẺ',
    desc: 'Giảm 20% cho tất cả thành viên Dream Cinema. Tích điểm x2 cho mọi giao dịch mua vé và bắp nước.',
    bgColor: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)',
    icon: '✨'
  }
];

export const PromotionCarousel = () => {
  return (
    <section style={{ padding: '4rem 0', background: '#0a0b10' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ 
          color: '#fff', 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ color: '#eb3656' }}>|</span> Khuyến Mãi & Sự Kiện
        </h2>

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect={'fade'}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          style={{ borderRadius: '16px', overflow: 'hidden' }}
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div style={{
                background: promo.bgColor,
                padding: '4rem',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative circle */}
                <div style={{
                  position: 'absolute',
                  right: '-10%',
                  top: '-20%',
                  width: '400px',
                  height: '400px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  filter: 'blur(40px)'
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{promo.icon}</div>
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: '2.5rem', 
                    fontWeight: 800,
                    marginBottom: '1rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {promo.title}
                  </h3>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    fontSize: '1.4rem',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    {promo.desc}
                  </p>
                  <button style={{
                    marginTop: '2rem',
                    padding: '12px 30px',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
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
