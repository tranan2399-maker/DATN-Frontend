import { QueryMovie, getAllMovieHome, getMovieStatus } from '@/api/movie'
import { MOVIE } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

function useAllMovie() {
  return useQuery({
    queryKey: [MOVIE],
    queryFn: () => getAllMovieHome()
  })
}
export function useStatusMovie(query: QueryMovie) {
  return useQuery({
    queryKey: [MOVIE, query],
    queryFn: () => getMovieStatus(query)
  })
}

export default useAllMovie
