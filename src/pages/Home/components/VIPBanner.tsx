export const VIPBanner = () => {
  return (
    <section style={{ padding: '2rem 20px 6rem', background: '#0a0b10' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #111 0%, #222 100%)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 215, 0, 0.2)'
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
          <h2 style={{
            color: '#FFD700',
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(255, 215, 0, 0.2)'
          }}>
            Trở Thành Hội Viên VIP
          </h2>
          <p style={{
            color: '#ccc',
            fontSize: '1.4rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
            fontWeight: 500
          }}>
            Đăng ký thẻ thành viên Dream Cinema ngay hôm nay để nhận đặc quyền vô hạn. 
            Tích điểm lên tới 10% cho mọi giao dịch, tặng bắp nước sinh nhật và xem phim sớm trước ngày công chiếu.
          </p>
          <button style={{
            padding: '15px 40px',
            background: 'linear-gradient(135deg, #FFD700 0%, #F7971E 100%)',
            color: '#000',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1.3rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(255, 215, 0, 0.3)',
            transition: 'transform 0.3s ease',
            textTransform: 'uppercase'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Đăng Ký Ngay
          </button>
        </div>

        {/* Card Mockup */}
        <div style={{ position: 'relative', zIndex: 1, width: '300px', height: '190px' }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #FFD700 0%, #F7971E 100%)',
            borderRadius: '16px',
            boxShadow: '-20px 20px 40px rgba(0,0,0,0.5)',
            transform: 'rotate(-15deg) translateY(-20px)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#000'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', justifyContent: 'space-between' }}>
              <span>DREAM CINEMA</span>
              <span>VIP</span>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '5px' }}>MEMBER CARD</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '2px' }}>xxxx xxxx xxxx xxxx</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
