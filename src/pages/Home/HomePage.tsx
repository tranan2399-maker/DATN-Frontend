// import { HeroSection } from './components/HeroSection'
import { HomeCollection } from './components/HomeCollection'
import { Features } from './components/Features'
import { PromotionCarousel } from './components/PromotionCarousel'
import { TopBoxOffice } from './components/TopBoxOffice'
import { MovieNews } from './components/MovieNews'
import { VIPBanner } from './components/VIPBanner'
// import { SocialLinks } from './components/SocialLinks'
import { TopEdge } from '../../components/TopEdge'
import IntroduceMovie from './components/IntroduceMovie'
// import Header from '../../layouts/components/Header/Header'
// import Footer from '../../layouts/components/Footer/Footer'
import { MoviePropsType } from './components/HomeCollection'
const HomePage = ({ dataMovie, isLoading }: MoviePropsType) => {
  return (
    <>
      <TopEdge />
      <IntroduceMovie />
      <PromotionCarousel />
      {/* <HeroSection /> */}
      <TopBoxOffice dataMovie={dataMovie} />
      <HomeCollection dataMovie={dataMovie} isLoading={isLoading} />
      <Features />
      <MovieNews />
      <VIPBanner />
      {/* <SocialLinks /> */}
    </>
  )
}

export default HomePage
