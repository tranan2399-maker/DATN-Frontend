import { CollectionCard } from '../../../components/CollectionCard';
import HashLoader from 'react-spinners/HashLoader';
import { MovieType } from '@/Interface/movie';

export interface MoviePropsType {
  dataMovie: MovieType[];
  isLoading: boolean;
}

export const HomeCollection = ({ dataMovie, isLoading }: MoviePropsType) => {
  const override = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  if (isLoading) {
    return <HashLoader cssOverride={override} color="#eb3656" />;
  }

  // Giới hạn chỉ hiển thị 8 ảnh
  const limitedDataMovie = dataMovie?.slice(0, 8);

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection text-primary-locationMovie">
          Đang phát &rarr;
        </h1>
      </div>

      <div className="home-collection-container">
        {limitedDataMovie?.map((latestMovie: MovieType, idx: number) => {
          return <CollectionCard key={idx} className="" movie={latestMovie} />;
        })}
      </div>
    </section>
  );
};
