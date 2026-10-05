import { getlSeatByShow } from '@/api/seat'
import { SEAT_STORE } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

function useAllSeatByShowTime(id_show_hall: {
  _hallId: string
  _showId: string
}) {
  return useQuery({
    queryKey: [SEAT_STORE, id_show_hall],
    queryFn: () => getlSeatByShow(id_show_hall),
    refetchInterval: 5000,
    enabled: Boolean(id_show_hall?._hallId && id_show_hall?._showId)
  })
}

export default useAllSeatByShowTime
