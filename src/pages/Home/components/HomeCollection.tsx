import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CollectionCard } from '../../../components/CollectionCard';
import { MovieType } from '@/Interface/movie';
import { useEffect } from 'react';

export interface MoviePropsType {
  dataMovie: MovieType[];
  isLoading: boolean;
}

const swiperStyles = `
  .swiper-button-next, .swiper-button-prev {
    color: #eb3656 !important;
    background: rgba(0,0,0,0.7);
    width: 40px !important;
    height: 40px !important;
    border-radius: 50%;
    border: 1px solid rgba(235,54,86,0.3);
  }
  .swiper-button-next::after, .swiper-button-prev::after {
    font-size: 16px !important;
    font-weight: 800;
  }
  .swiper-pagination-bullet { background: #555 !important; }
  .swiper-pagination-bullet-active { background: #eb3656 !important; }
  @keyframes skeleton-pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  .skeleton-card { animation: skeleton-pulse 1.5s ease-in-out infinite; }
`;

const SkeletonCard = () => (
  <div className="skeleton-card" style={{
    borderRadius: '12px', overflow: 'hidden', background: '#1e2130'
  }}>
    <div style={{ aspectRatio: '2/3', background: '#2a2d3e' }} />
    <div style={{ padding: '12px' }}>
      <div style={{ height: '18px', borderRadius: '4px', background: '#2a2d3e', marginBottom: '8px' }} />
      <div style={{ height: '14px', borderRadius: '4px', background: '#2a2d3e', width: '60%', marginBottom: '8px' }} />
      <div style={{ height: '36px', borderRadius: '8px', background: '#2a2d3e' }} />
    </div>
  </div>
)

export const HomeCollection = ({ dataMovie, isLoading }: MoviePropsType) => {
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = swiperStyles;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  return (
    <section id="nowShowing" style={{ padding: '4rem 0', background: '#141414' }}>
      <div style={{ maxWidth: '132rem', margin: '0 auto', padding: '0 3.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '4px', height: '28px',
            background: 'linear-gradient(to bottom, #eb3656, #c41d3a)',
            borderRadius: '2px'
          }} />
          <h2 style={{
            color: '#fff', fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.3px'
          }}>Phim Đang Chiếu</h2>
          <span style={{
            background: 'rgba(235,54,86,0.15)', border: '1px solid rgba(235,54,86,0.4)',
            color: '#eb3656', padding: '4px 12px', borderRadius: '20px',
            fontSize: '1.2rem', fontWeight: 600
          }}>HOT</span>
        </div>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            style={{ paddingBottom: '40px' }}
          >
            {dataMovie?.map((movie: MovieType, idx: number) => (
              <SwiperSlide key={idx}>
                <CollectionCard className="" movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
