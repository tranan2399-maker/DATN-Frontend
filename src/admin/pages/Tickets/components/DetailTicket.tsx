import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import { useParams } from 'react-router-dom'
import DetailTicketItem from './DetailTicketItem'

function DetailTicket() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id } = useParams()
  //   const movies = useSelector((state: any) => state.movies.movies)
  //   const { slug } = useParams()
  //   const { _id = '', name = '' } =
  //     movies.length > 0 && movies.find((movie: MovieType) => movie.slug === slug)

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={'Vé'}
        pageLink="/admin/tickets"
        pageRetun="Vé / Chi tiết vé"
      />
      {id && <DetailTicketItem ticketId={id} />}
    </DefaultLayout>
  )
}

export default DetailTicket
