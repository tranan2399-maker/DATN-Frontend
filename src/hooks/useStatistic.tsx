import { getCountUser } from '@/api/auth'

import { getCountMovie } from '@/api/movie'
import {
  getAgeUser,
  getChartRevenueWeek,
  getCountCate,
  getCountTicketAfterWeek,
  getProfitAndRevenue,
  getSexUser,
  getTopFood,
  getTopMovie,
  getTopUser
} from '@/api/statistic'

import { useQuery } from '@tanstack/react-query'

export function useStatistic(action: string) {
  return useQuery({
    queryKey: [action],
    queryFn: () => {
      switch (action) {
        case 'USER_COUNT':
          return getCountUser()
        case 'MOVIE_COUNT':
          return getCountMovie()
        case 'REVENUE_PROFIT':
          return getProfitAndRevenue()
        case 'TOP_MOVIE':
          return getTopMovie()
        case 'TOP_USER':
          return getTopUser()
        case 'CATE_COUNT':
          return getCountCate()
        case 'TOP_FOOD':
          return getTopFood()
        case 'TICKET_COUNT':
          return getCountTicketAfterWeek()
        case 'SEX_USER':
          return getSexUser()
        case 'AGE_USER':
          return getAgeUser()
        case 'CHART_REVENUE_PROFIT':
          return getChartRevenueWeek()
        default:
          return getProfitAndRevenue()
      }
    }
  })
}
export default useStatistic
