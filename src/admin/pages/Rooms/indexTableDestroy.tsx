import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableRoomsDestroy from './components/TableDestroy'

const RoomsPageDestroy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Phòng chiếu bị hủy"
        pageRetun="Phòng chiếu / Phòng chiếu bị hủy"
        pageLink="/admin/screeningrooms"
      />

      <div className="flex flex-col gap-10">
        <TableRoomsDestroy />
      </div>
    </DefaultLayout>
  )
}

export default RoomsPageDestroy
