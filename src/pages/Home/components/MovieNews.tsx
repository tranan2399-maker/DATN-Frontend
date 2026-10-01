import { Clock } from 'lucide-react';

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
    <section className="py-16 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-[#eb3656] rounded-sm"></div>
            <h2 className="text-white text-3xl font-bold uppercase tracking-tight">Góc Điện Ảnh</h2>
          </div>
          <a href="#" className="text-[#eb3656] hover:text-white transition-colors font-medium hidden sm:block">
            Xem tất cả &raquo;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0a0b10] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group border border-white/5"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <span className="absolute top-4 left-4 bg-[#eb3656] text-white px-3 py-1 rounded text-sm font-bold shadow-md">
                  {item.tag}
                </span>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-white text-xl font-bold leading-snug line-clamp-2 group-hover:text-[#eb3656] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
           <a href="#" className="text-[#eb3656] font-medium inline-block p-2">Xem tất cả &raquo;</a>
        </div>
      </div>
    </section>
  );
};
