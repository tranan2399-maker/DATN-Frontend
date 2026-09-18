import DefaultLayout from '@/admin/layout/DefaultLayout'

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import RestoreItem from './RestoreItem'

const Restore = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Lịch chiếu đã bị xóa"
        pageLink="/admin/showtimes"
        pageRetun="Lịch chiếu / Lịch chiếu bị xóa"
      />
      <RestoreItem />
    </DefaultLayout>
  )
}

export default Restore
