import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Navigate } from 'react-router-dom'

function ProtectedConfirm({
  redirectPath = '/',
  children
}: {
  redirectPath?: string
  children: React.ReactNode
}) {
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const paymentToken = localStorage.getItem('paymentToken')

  if (ticket && Object.keys(ticket).length > 5 && paymentToken) {
    return children
  }

  return <Navigate to={redirectPath} replace />
}

export default ProtectedConfirm
