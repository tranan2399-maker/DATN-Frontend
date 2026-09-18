import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'

import ListTicketReserved from './components/ListTicketReserved'

const TicketsPageReserved = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Vé"
        pageRetun="Danh sách vé chưa thanh toán"
        pageLink="/admin/tickets"
      />

      <div className="flex flex-col gap-10">
        <ListTicketReserved />
      </div>
    </DefaultLayout>
  )
}

export default TicketsPageReserved
