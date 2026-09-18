import { getWatchListByUser } from '@/api/watchList'
import { WATCHLIST } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
function useWatchList(userDetail: { message: { _id: string } }) {
  return useQuery({
    queryKey: [WATCHLIST, userDetail?.message?._id],
    queryFn: () => getWatchListByUser(userDetail?.message?._id)
  })
}

export default useWatchList
