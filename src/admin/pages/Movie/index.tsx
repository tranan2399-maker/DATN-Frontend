import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import TableMovie from './components/TableMovie'

const MoviePageadmin = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Phim" pageLink='/admin/movie' pageRetun='Phim' />
      <div className="flex flex-col gap-10">
        <TableMovie />
      </div>
    </DefaultLayout>
  )
}

export default MoviePageadmin
