import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormCategory from './components/FormCategory'

const CategoryAdd = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Category" />

      <div className="flex flex-col gap-10">
        <FormCategory typeForm="ADD" />
      </div>
    </DefaultLayout>
  )
}

export default CategoryAdd
