export function CinemaScreenArc() {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-2 pb-6 select-none">
      {/* Curved Screen SVG */}
      <div className="relative w-full max-w-[560px] h-[52px] flex items-center justify-center">
        <svg
          viewBox="0 0 500 50"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(229,9,20,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer glow arc */}
          <path
            d="M20 40 Q250 8 480 40"
            stroke="url(#screenGlow)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Core bright white arc */}
          <path
            d="M20 40 Q250 8 480 40"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient downward light cone */}
        <div
          className="absolute top-6 w-[80%] h-8 pointer-events-none opacity-40 blur-lg"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.45) 0%, rgba(229, 9, 20, 0.15) 50%, transparent 80%)'
          }}
        />
      </div>

      <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#71717A] mt-1 font-headline">
        MÀN HÌNH CHIẾU / SCREEN
      </p>
    </div>
  )
}
