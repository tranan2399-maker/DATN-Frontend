import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoviePropsType } from './components/HomeCollection';
import { mapMovieToStitch } from './homeAdapter';
import { HeroBanner } from './components/HeroBanner';
import { QuickBookingBar } from './components/QuickBookingBar';
import { StickyFilterBar } from './components/StickyFilterBar';
import { NowShowing } from './components/NowShowing';
import { TopRanking } from './components/TopRanking';
import { ImmersionCards } from './components/ImmersionCards';
import { CinemaShowtimes } from './components/CinemaShowtimes';
import { Promotions } from './components/Promotions';
import { ComingSoon } from './components/ComingSoon';
import { EditorialCorner } from './components/EditorialCorner';
import { VIPBanner } from './components/VIPBanner';
import { VipModal } from './components/VipModal';
import { TrailerModal } from './components/TrailerModal';
import { TopEdge } from '../../components/TopEdge';

import './home-stitch.css';

// Tab route map - maps logical tab names to real URL paths
const TAB_ROUTES: Record<string, string> = {
  phim: '/movie',
  'lich-chieu': '/showtimes',
  rap: '/showtimes',
};

const HomePage = ({ dataMovie, isLoading }: MoviePropsType) => {
  const navigate = useNavigate();
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  // Sticky Filter Bar state
  const [selectedLanguage, setSelectedLanguage] = useState('Tất cả');
  const [selectedFormat, setSelectedFormat] = useState('Tất cả');

  const stitchMovies = (dataMovie || []).map(mapMovieToStitch);

  const handleSelectMovie = (movie: any) => navigate('/movie/' + movie.slug);

  const handleStartBooking = (movie: any) => {
    navigate('/movie/' + movie.slug);
  };

  const handleSelectTab = (tab: string) => {
    const route = TAB_ROUTES[tab];
    if (route) navigate(route);
  };

  const handleOpenVipModal = () => {
    setIsVipOpen(true);
  };

  return (
    <>
      <TopEdge />
      <div className="homepage-stitch flex flex-col w-full bg-[#0e0e12] text-[#e4e1e7] min-h-screen">
        {/* 1. Hero Banner with 3D Tilted Floating Poster & Trailer Watcher */}
        <HeroBanner
          movies={stitchMovies}
          isLoading={isLoading}
          onSelectMovie={handleSelectMovie}
          onStartBooking={handleStartBooking}
          onWatchTrailer={(url) => setTrailerUrl(url || null)}
        />

        {/* 2. Quick Booking Bar (Overlaps bottom of hero) */}
        <QuickBookingBar movies={stitchMovies} />

        {/* 3. Sticky Filter Bar (Language & Format tabs) */}
        <StickyFilterBar
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
        />

        {/* 4. Now Showing (Filtered by language/format, category tabs) */}
        <NowShowing
          movies={stitchMovies}
          onSelectMovie={handleSelectMovie}
          onStartBooking={handleStartBooking}
          onSelectTab={handleSelectTab}
          selectedFormat={selectedFormat}
          selectedLanguage={selectedLanguage}
        />

        {/* 5. Top 5 Ranking (Massive Outlined Numbers #1..#5) */}
        <TopRanking movies={stitchMovies} onSelectMovie={handleSelectMovie} />

        {/* 6. Cinematic Immersion Cards (IMAX Laser, Dolby Atmos, LUXE VIP) */}
        <ImmersionCards onSelectTab={handleSelectTab} onOpenVipModal={handleOpenVipModal} />

        {/* 7. Cinema Showtimes with Date Tabs & Vietnam Timezone helper */}
        <CinemaShowtimes />

        {/* 8. Promotions & Offers */}
        <Promotions />

        {/* 9. Coming Soon Movies with Reminder Toggles */}
        <ComingSoon
          movies={stitchMovies}
          onSelectMovie={handleSelectMovie}
          onSelectTab={handleSelectTab}
        />

        {/* 10. Editorial Cinema Corner (Articles & Reviews) */}
        <EditorialCorner />

        {/* 11. VIP Membership Banner (Luxury Black & Gold) */}
        <VIPBanner onOpenVipModal={handleOpenVipModal} />

        {/* Interactive VIP Membership Modal */}
        <VipModal isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} />

        {/* YouTube Trailer Modal */}
        <TrailerModal
          isOpen={!!trailerUrl}
          trailerUrl={trailerUrl || undefined}
          onClose={() => setTrailerUrl(null)}
        />
      </div>
    </>
  );
};

export default HomePage;
