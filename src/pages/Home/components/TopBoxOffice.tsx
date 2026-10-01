import { MovieType } from '@/Interface/movie';
import { useNavigate } from 'react-router-dom';

export const TopBoxOffice = ({ dataMovie }: { dataMovie: MovieType[] }) => {
  const navigate = useNavigate();
  // Filter top 5 movies by rate
  const topMovies = dataMovie ? [...dataMovie].sort((a, b) => b.rate - a.rate).slice(0, 5) : [];

  return (
    <section style={{ padding: '2rem 0', background: '#141414' }}>
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
          <span style={{ color: '#eb3656' }}>|</span> Bảng Xếp Hạng Phim Hot
        </h2>

        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto', 
          paddingBottom: '20px',
          scrollSnapType: 'x mandatory'
        }} className="hide-scroll-bar">
          {topMovies.map((movie, index) => (
            <div 
              key={movie._id} 
              onClick={() => navigate('/movie/' + movie.slug)}
              style={{
                minWidth: '220px',
                flex: '0 0 auto',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                scrollSnapAlign: 'start',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Rank Badge */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FFD700 0%, #F7971E 100%)',
                color: '#000',
                fontSize: '2.5rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                zIndex: 10,
                border: '3px solid #141414',
                boxShadow: '0 5px 15px rgba(255, 215, 0, 0.4)'
              }}>
                {index + 1}
              </div>

              <img 
                src={movie.image} 
                alt={movie.name} 
                style={{
                  width: '100%',
                  height: '330px',
                  objectFit: 'cover'
                }} 
              />
              
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px 15px 15px',
                background: 'linear-gradient(to top, rgba(10,11,16,1) 0%, transparent 100%)',
              }}>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: '1.2rem', 
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {movie.name}
                </h4>
                <div style={{ color: '#f5c518', fontSize: '1rem', marginTop: '4px' }}>
                  ★ {movie.rate} / 5
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
