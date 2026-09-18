import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormCinema from './components/FormCinema'

const CinemaEdit = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cập nhật rạp chiếu" pageLink='/admin/cinema' pageRetun='Rạp chiếu / Sửa rạp chiếu'/>

      <div className="flex flex-col gap-10">
        <FormCinema typeForm="EDIT" />
      </div>
    </DefaultLayout>
  )
}

export default CinemaEdit
