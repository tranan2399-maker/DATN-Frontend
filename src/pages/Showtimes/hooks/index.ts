import { getAllCategory } from '@/api/category'
import { useQuery } from '@tanstack/react-query'

export const useAllCategory = () => {
  return useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => getAllCategory()
  })
}
