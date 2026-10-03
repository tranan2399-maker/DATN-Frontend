export const Promotions = () => {
  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="mb-4">
        <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">
          Ưu đãi độc quyền
        </span>
        <h2 className="text-2xl sm:text-3xl text-white font-bold">Khuyến mãi &amp; Sự kiện nổi bật</h2>
      </div>

      <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#380407] via-[#1A0A0C] to-[#0B0B0F] p-6 md:p-10 flex flex-col justify-center min-h-[260px] shadow-2xl border border-white/[0.08]">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-30 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLtmHy4V_6VUp7v7PflA3UoD7kRnJHP-qHxOguw6VIFupLFXxIPuPuBAuMPZzDqlEHPULWcpUbuAbDs1xCs6yEgJG5L-8EOPBd78tUD6kLzzA1Ls2HxT3NN7U7zYjDe7VNjJ77FTh5DDMcmNHi_jucIPv7H0ZyNbWJ8qV60zwmVEJYrk8oj7a_oH3_D1dXnxD3Uo-PqdMoC7C5jipA4Vg2GQnViSbIy3lEQLZfJcivIPesVpmYAQ_b_g')",
          }}
        />

        <div className="relative z-10 max-w-[640px] space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#f5b300] text-[#412d00] text-xs font-bold tracking-wider inline-block">
            HAPPY WEDNESDAY
          </span>
          <h3 className="text-2xl sm:text-3xl text-white font-extrabold leading-tight">
            THỨ 4 VUI VẺ – NHÂN ĐÔI ĐIỂM THƯỞNG &amp; ĐỒNG GIÁ 75K
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A8B3]">
            Áp dụng cho toàn bộ thành viên Dream Cinema trên toàn quốc vào mỗi thứ Tư hàng tuần. Tận hưởng mọi bom tấn với giá cực ưu đãi.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <button className="h-11 px-6 rounded-xl bg-white text-[#0B0B0F] text-xs sm:text-sm font-bold hover:bg-[#E50914] hover:text-white transition-all shadow-md cursor-pointer">
              Nhận ưu đãi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
