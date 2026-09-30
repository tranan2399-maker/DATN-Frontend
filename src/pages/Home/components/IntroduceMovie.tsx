import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TicketCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import imgBg from '/Images/movies/money_heist-bg.jpg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function IntroduceMovie() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
      <style>{
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerTitle {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(235,54,86,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(235,54,86,0.7)); }
        }
        .hero-btn-primary:hover {
          background: linear-gradient(135deg, #ff1a45, #eb3656) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(235,54,86,0.5) !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.2) !important;
          transform: translateY(-2px);
        }
      }</style>

      {/* Background image with fade-in */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '88vh',
        animation: loaded ? 'heroFadeIn 1.2s ease forwards' : 'none',
        opacity: loaded ? 1 : 0
      }}>
        <img
          src={imgBg}
          alt="money_heist"
          style={{
            width: '100%',
            height: '88vh',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Multi-layer gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 20%, transparent 60%)'
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)'
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: '55%', maxWidth: '600px',
          display: 'flex', alignItems: 'center'
        }}>
          <div style={{ padding: '0 4rem 0 5rem', width: '100%' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(235,54,86,0.2)',
              border: '1px solid rgba(235,54,86,0.5)',
              borderRadius: '20px', padding: '6px 16px',
              marginBottom: '20px',
              animation: loaded ? 'slideUp 0.8s ease 0.2s both' : 'none'
            }}>
              <span style={{ color: '#eb3656', fontSize: '1.2rem', fontWeight: 600 }}>?? ÐANG CHI?U</span>
            </div>

            {/* Movie logo */}
            <div style={{ animation: loaded ? 'slideUp 0.8s ease 0.4s both' : 'none' }}>
              <img
                style={{ width: '85%', maxWidth: '420px', filter: 'drop-shadow(0 4px 20px rgba(235,54,86,0.4))', animation: 'shimmerTitle 3s ease-in-out infinite' }}
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1708832547/money-heist-title-la-casa-de-pap-removebg-preview_qgqeco.png"
                alt="Money Heist"
              />
            </div>

            {/* Meta info */}
            <div style={{
              display: 'flex', gap: '16px', marginTop: '16px', marginBottom: '20px',
              animation: loaded ? 'slideUp 0.8s ease 0.6s both' : 'none'
            }}>
              {['18+', '4 Ph?n', 'Hành Ð?ng', '2017'].map((tag, i) => (
                <span key={i} style={{
                  color: '#ccc', fontSize: '1.3rem',
                  padding: '3px 10px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)'
                }}>{tag}</span>
              ))}
            </div>

            {/* Description */}
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1.5rem',
              lineHeight: 1.7,
              marginBottom: '32px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              animation: loaded ? 'slideUp 0.8s ease 0.7s both' : 'none'
            } }>
              Money Heist (La Casa de Papel) là lo?t phim n?i ti?ng c?a Netflix v? m?t nhóm cý?p có tên gi?.
              Giáo sý là k? ch? mýu ð?ng sau các v? cý?p và có m?t c?t truy?n bi th?m thúc ð?y hành ð?ng c?a m?nh.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex', gap: '16px', flexWrap: 'wrap',
              animation: loaded ? 'slideUp 0.8s ease 0.9s both' : 'none'
            }}>
              <Link to={'/movie/money-heist'}>
                <button
                  className="hero-btn-primary"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #eb3656, #c41d3a)',
                    color: '#fff', border: 'none',
                    padding: '14px 28px', borderRadius: '8px',
                    fontSize: '1.5rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(235,54,86,0.3)',
                    letterSpacing: '0.3px'
                  }}
                >
                  <TicketCheck size={20} /> Nh?n vé ngay
                </button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="hero-btn-secondary"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '14px 28px', borderRadius: '8px',
                      fontSize: '1.5rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.3s ease',
                      letterSpacing: '0.3px'
                    }}
                  >
                    ? Xem trailer
                  </button>
                </DialogTrigger>
                <DialogContent className="p-0 w-fit border-0 bg-black">
                  <iframe
                    className="xl:w-[917px] xl:h-[516px] md:w-[517px] md:h-[316px] xs:w-[320px] xs:h-[186px]"
                    src="https://www.youtube.com/embed/_InqQJRqGW4?si=7jJpOKRk9LZYswtd"
                    title="Money Heist Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroduceMovie
