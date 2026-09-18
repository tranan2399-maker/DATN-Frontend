import MoviePageItem from './MoviePageItem'

function MoviePageCollection() {
  return (
    <section className="section-movies-page bg-background-secondary">
      <div className="movies-page-collection container">
        <MoviePageItem title="Đang chiếu" status="IS_SHOWING" />
        <MoviePageItem title="Phim nổi bật" status="HOT" />
        <MoviePageItem title="Sắp ra mắt" status="COMING_SOON" />
      </div>
    </section>
  )
}

export default MoviePageCollection
