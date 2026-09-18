import { TicketBill } from '@/Interface/ticket'
import { getAllTikets } from '@/api/ticket'
import { useQuery } from '@tanstack/react-query'

// { id: 1, _limit: 10, _page: 1 }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTicketQuery = (options?: any) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery<TicketBill[]>({
    queryKey: ['TICKET_KEY', options],
    // queryFn: async () => {
    //     return options?.id ? await getOneTikets(options.id as  string) : await getAllTikets()
    // }
    queryFn: () => getAllTikets()
  })

  return { data, ...rest }
}
