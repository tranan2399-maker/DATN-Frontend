export const MovieNews = () => {
  const news = [
    {
      id: 1,
      title: 'Khám phá bí mật hậu trường bom tấn "Dune: Hành tinh cát - Phần 2"',
      image: 'https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2024/3/1/dune-2-2-1709292850388147748430.jpeg',
      date: '02/10/2026',
      tag: 'Hậu Trường'
    },
    {
      id: 2,
      title: 'Deadpool & Wolverine: Sự kết hợp điên rồ nhất vũ trụ MCU',
      image: 'https://images2.thanhnien.vn/528068263637045248/2024/2/13/deadpool-3-17077977457781037597194.jpeg',
      date: '01/10/2026',
      tag: 'Review Phim'
    },
    {
      id: 3,
      title: 'Top 5 phim kinh dị đáng mong chờ nhất dịp Halloween 2026',
      image: 'https://vcdn1-giaitri.vnecdn.net/2023/10/27/The-Nun-2-2975-1698380486.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GZ7b8bZ-n2Z8tq6N7b8bZg',
      date: '30/09/2026',
      tag: 'List Phim'
    }
  ];

  return (
    <section style={{ padding: '4rem 0', background: '#0a0b10' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <h2 style={{ 
            color: '#fff', 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: '#eb3656' }}>|</span> Góc Điện Ảnh
          </h2>
          <a href="#" style={{ color: '#eb3656', fontSize: '1.2rem', fontWeight: 600, textDecoration: 'none' }}>
            Xem tất cả »
          </a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {news.map((item) => (
            <div key={item.id} style={{
              background: '#141414',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: '#eb3656',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  {item.tag}
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: '10px' }}>
                  🕒 {item.date}
                </div>
                <h3 style={{ 
                  color: '#fff', 
                  fontSize: '1.4rem', 
                  fontWeight: 600,
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
