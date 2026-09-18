// import { Button } from "@/components/ui/button";

// import { Plus } from "lucide-react";
// import { Link } from "react-router-dom";
import { columnsReserved } from './Colunm'
import Loading from '@/admin/components/Loading/Loading'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTicketReserved, getAllTiketsReserved } from '@/api/ticket'
import DataTicketReserved from './TicketTableReserved'

const ListTicketReserved = () => {
  const queryClient = useQueryClient()
  const { data: dataReserved, isLoading: reservedLoading } = useQuery({
    queryKey: ['TICKET_RESERVED'],
    queryFn: () => getAllTiketsReserved()
  })
  const { mutate: deleteTicket } = useMutation({
    mutationFn: (id: string) => deleteTicketReserved(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['TICKET_RESERVED']
      })
    }
  })
  const columns = columnsReserved(deleteTicket)
  if (reservedLoading) return <Loading />
  return (
    <>
      {dataReserved && (
        <DataTicketReserved columns={columns} data={dataReserved} />
      )}
    </>
  )
}

export default ListTicketReserved
