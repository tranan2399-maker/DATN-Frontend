// import { Button } from "@/components/ui/button";

// import { Plus } from "lucide-react";
// import { Link } from "react-router-dom";
import { columns } from './Colunm'
import { useTicketQuery } from '@/admin/common/hooks/useTicketQuery'
import Loading from '@/admin/components/Loading/Loading'
import DataTableDemo from './DataTable2'

const ListTicketDemo = () => {
  const { data, isLoading } = useTicketQuery()

  if (isLoading) return <Loading />
  return <>{data && <DataTableDemo columns={columns} data={data} />}</>
}

export default ListTicketDemo
