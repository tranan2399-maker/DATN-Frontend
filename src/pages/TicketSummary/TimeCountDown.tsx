import useTicket from '@/hooks/useTicket'
import { TicketType } from '@/store/ticket'
import { DELETE_TICKET } from '@/utils/constant'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { useCountdown } from 'usehooks-ts'
import { useNavigate } from 'react-router-dom'
function TimeCountDown() {
  const navigate = useNavigate()
  const [intervalValue] = useState<number>(1000)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const mutation = useTicket(DELETE_TICKET)
  const [countdown, setCountdown] = useLocalStorage<number | null>('countdown')
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: countdown ? countdown : 140,
    intervalMs: intervalValue
  })
  useEffect(() => {
    startCountdown()
    setCountdown(count)
    if (count == 1) {
      stopCountdown()
      mutation.mutate({
        ticket_id: ticket.ticket_id
      })
      setCountdown(null)
      navigate('/')
      setTicket({})
    }
  }, [count])
  const minutes = Math.floor(count / 60)
  const remainingSeconds = count % 60

  return (
    <>
      <p className="text-3xl text-primary-movieColor">
        {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </p>
    </>
  )
}

export default TimeCountDown
