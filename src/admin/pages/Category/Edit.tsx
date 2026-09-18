import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormCategory from './components/FormCategory'

const CategoryEdit = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />

      <div className="flex flex-col gap-10">
        <FormCategory typeForm="EDIT" />
      </div>
    </DefaultLayout>
  )
}

export default CategoryEdit
