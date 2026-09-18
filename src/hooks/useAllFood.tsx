import { getAllFood } from '@/api/food'
import { FOOD } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

function useAllFood() {
  return useQuery({
    queryKey: [FOOD],
    queryFn: () => getAllFood(),
    refetchInterval: 5000
  })
}


export default useAllFood
