export const VIPBanner = () => {
  return (
    <section className="py-12 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0b10] rounded-3xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-2xl relative overflow-hidden border border-yellow-500/20">
          
          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 md:w-3/5 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 text-3xl md:text-5xl font-black mb-4 drop-shadow-sm uppercase">
              Trở Thành Hội Viên VIP
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              Đăng ký thẻ thành viên Dream Cinema ngay hôm nay để nhận đặc quyền vô hạn. 
              Tích điểm lên tới 10% cho mọi giao dịch, tặng bắp nước sinh nhật và xem phim sớm trước ngày công chiếu.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-lg font-extrabold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_5px_20px_rgba(253,224,71,0.4)]">
              Đăng Ký Ngay
            </button>
          </div>

          {/* Card Mockup */}
          <div className="relative z-10 w-[280px] sm:w-[320px] h-[180px] sm:h-[200px] perspective-1000 mx-auto md:mx-0">
            <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-2xl shadow-[-20px_20px_40px_rgba(0,0,0,0.6)] transform -rotate-[10deg] -translate-y-2 p-6 flex flex-col justify-between text-black border border-yellow-200/50 relative overflow-hidden">
              
              {/* Card glare */}
              <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex justify-between items-start font-black text-xl tracking-tight relative z-10">
                <span>DREAM CINEMA</span>
                <span className="bg-black text-yellow-400 px-2 py-0.5 rounded text-sm tracking-widest">VIP</span>
              </div>
              
              <div className="relative z-10">
                <div className="text-sm opacity-80 font-bold mb-1 uppercase tracking-widest">Member Card</div>
                <div className="text-xl font-mono font-bold tracking-[0.2em]">•••• •••• •••• 9999</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
