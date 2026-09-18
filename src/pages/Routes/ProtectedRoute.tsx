import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Navigate } from 'react-router-dom'

function ProtectedRoutePage({ redirectPath='/', children }: { redirectPath?: string, children : React.ReactNode }) {
  const [ticket] = useLocalStorage<TicketType | null>('ticket')
  if (ticket && Object.keys(ticket).length >= 0)
    return children
  return <Navigate to={redirectPath} replace />
}

export default ProtectedRoutePage
