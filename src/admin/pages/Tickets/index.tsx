import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'

import ListTicketDemo from './components/ListTicket2'

const TicketsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Vé"
        pageRetun="Danh sách vé"
        pageLink="/admin/tickets"
      />

      <div className="flex flex-col gap-10">
        <ListTicketDemo />
      </div>
    </DefaultLayout>
  )
}

export default TicketsPage
