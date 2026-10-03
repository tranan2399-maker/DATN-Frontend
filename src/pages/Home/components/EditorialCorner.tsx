import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '../homeStaticContent';

export const EditorialCorner = () => {
  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 md:px-6 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs text-[#ffb4aa] font-bold uppercase tracking-widest block mb-1">
            Cập nhật tin tức
          </span>
          <h2 className="text-2xl sm:text-3xl text-white font-bold">Góc Điện Ảnh &amp; Phê Bình</h2>
        </div>
        <button
          className="text-xs font-bold text-[#ffb4aa] hover:underline flex items-center gap-1 cursor-pointer"
        >
          Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map(art => (
          <article
            key={art.id}
            className="bg-[#1F1F23] rounded-2xl overflow-hidden hover:bg-[#2A292E] transition-colors group cursor-pointer flex flex-col border border-white/[0.04]"
          >
            <div className="aspect-video w-full overflow-hidden bg-[#1b1b1f]">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#E50914]/20 text-[#ffb4aa] text-[10px] font-bold">
                    {art.badge}
                  </span>
                  <span className="text-[#A8A8B3] text-[11px]">{art.date} • {art.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#ffb4aa] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#A8A8B3] mt-2 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-2 flex items-center gap-1 text-[#ffb4aa] text-xs font-bold">
                Đọc tiếp <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
