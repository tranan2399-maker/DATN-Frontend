import { MovieType } from '@/Interface/movie';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export const TopBoxOffice = ({ dataMovie }: { dataMovie: MovieType[] }) => {
  const navigate = useNavigate();
  // Filter top 5 movies by rate
  const topMovies = dataMovie ? [...dataMovie].sort((a, b) => b.rate - a.rate).slice(0, 5) : [];

  return (
    <section className="py-12 bg-[#0a0b10]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-[#eb3656] rounded-sm"></div>
          <h2 className="text-white text-3xl font-bold uppercase tracking-tight">Bảng Xếp Hạng Phim Hot</h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scroll-bar">
          {topMovies.map((movie, index) => (
            <div 
              key={movie._id} 
              onClick={() => navigate('/movie/' + movie.slug)}
              className="min-w-[200px] md:min-w-[240px] flex-none relative rounded-xl overflow-hidden cursor-pointer snap-start transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(235,54,86,0.3)] group"
            >
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-2xl font-black flex items-center justify-center rounded-full z-10 border-4 border-[#0a0b10] shadow-lg">
                {index + 1}
              </div>

              <img 
                src={movie.image} 
                alt={movie.name} 
                className="w-full h-[320px] md:h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h4 className="text-white text-lg font-bold truncate mb-1 group-hover:text-[#eb3656] transition-colors">
                  {movie.name}
                </h4>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{movie.rate} / 5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
