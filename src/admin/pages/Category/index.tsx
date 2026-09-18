import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableCategory from './components/TableCategory'

const CategoryPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Danh mục" pageLink='/admin/category' pageRetun='Danh mục' />

      <div className="flex flex-col gap-10">
        <TableCategory />
      </div>
    </DefaultLayout>
  )
}

export default CategoryPage
