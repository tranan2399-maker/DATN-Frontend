import { useNavigate } from 'react-router-dom'
import { MovieType } from '@/Interface/movie'
import { convertMintuteToHour, getDay } from '@/utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState } from 'react'

export const CollectionCard = ({
  className,
  movie
}: {
  className?: string
  movie: MovieType
}) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const { slug, name, image, rate, categoryId, fromDate, duration } = movie

  const categorySection = categoryId?.slice(0, 2).map((category, index) => (
    <span
      key={index}
      style={{
        background: 'rgba(235, 54, 86, 0.15)',
        border: '1px solid rgba(235, 54, 86, 0.4)',
        color: '#ef5e78',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '1.1rem',
        fontWeight: 500,
        marginRight: '4px',
        display: 'inline-block',
        marginBottom: '4px'
      }}
    >
      {category.name}
    </span>
  ))

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < Math.round(rate) ? '#f5c518' : '#444', fontSize: '1.3rem' }}>★</span>
  ))

  return (
    <div
      className={`home-movie-card ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(145deg, #1e2130, #141720)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 20px 60px rgba(235, 54, 86, 0.3), 0 0 0 1px rgba(235, 54, 86, 0.2)'
          : '0 4px 20px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => navigate('/movie/' + slug)}
    >
      {/* Image container */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '2/3' }}>
        <LazyLoadImage
          src={image}
          alt={name}
          effect="opacity"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(14,16,22,0.95) 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />
        {/* Rating badge top right */}
        <div style={{
          position: 'absolute', top: '10px', right: '10px',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(4px)',
          borderRadius: '6px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          border: '1px solid rgba(245, 197, 24, 0.3)'
        }}>
          <span style={{ color: '#f5c518', fontSize: '1.2rem' }}>★</span>
          <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>{rate}/5</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px 14px' }}>
        <p style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.5rem',
          marginBottom: '8px',
          lineHeight: 1.3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{name}</p>

        {/* Stars */}
        <div style={{ marginBottom: '8px', display: 'flex', gap: '2px' }}>{stars}</div>

        {/* Genre badges */}
        <div style={{ marginBottom: '10px', minHeight: '26px' }}>{categorySection}</div>

        {/* Date & Duration */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#888', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📅</span> {getDay(fromDate)}
          </span>
          <span style={{ color: '#888', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>⏱</span> {convertMintuteToHour(duration)}
          </span>
        </div>

        {/* Book button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate('/movie/' + slug)
          }}
          style={{
            width: '100%',
            background: isHovered
              ? 'linear-gradient(135deg, #eb3656, #c41d3a)'
              : 'linear-gradient(135deg, #c41d3a, #9d1228)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '1.4rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.5px',
            boxShadow: isHovered ? '0 4px 15px rgba(235,54,86,0.4)' : 'none'
          }}
        >
          🎟 Đặt vé ngay
        </button>
      </div>
    </div>
  )
}
