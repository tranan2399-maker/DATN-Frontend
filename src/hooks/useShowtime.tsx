import { getOneShowtime } from '@/api/showtime'
import { SHOW_TIMES } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

export function useShowtime(id: string) {
  
  return useQuery({
    queryKey: [SHOW_TIMES, id],
    queryFn: () => getOneShowtime(id)
  })
}
