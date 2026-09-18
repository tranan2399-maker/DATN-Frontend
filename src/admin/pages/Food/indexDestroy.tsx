import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableFoodDestroy from './components/TableFoodDestroy'
const FoodAdminDestroyPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Quản lý đồ ăn đã xóa"
        pageRetun="Đồ ăn đã lưu trữ"
        pageLink="/admin/food/destroy"
      />

      <div className="flex flex-col gap-10">
        <TableFoodDestroy />
      </div>
    </DefaultLayout>
  )
}

export default FoodAdminDestroyPage
