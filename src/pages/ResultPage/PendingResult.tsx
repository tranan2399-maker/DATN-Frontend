import { TicketType } from '@/store/ticket'
import { filterData, mapData } from '@/utils/methodArray'
import { useLocalStorage } from '@uidotdev/usehooks'
import React, { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { COMPLETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'

import HashLoader from 'react-spinners/HashLoader'
// import successfulImage from './Images/customers/successfull-payment.png'
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
function PendingResult() {
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const [, setCountdown] = useLocalStorage<number | null>('countdown')
  const [toastShown, setToastShown] = useState(false)
  const navigate = useNavigate()
  const query = useQuery()
  const onSuccess = (data: string) => {
    if (!toastShown) {
      toast.success('Post ticket successfully !', {
        position: 'top-right'
      })
      setToastShown(true)
      setTicket({})
      setCountdown(null)
      localStorage.removeItem('paymentToken')
      localStorage.setItem('resultToken', data)
      navigate('/result')
    }
  }
  const onError = () => {
    setCountdown(null)
    setTicket({})
    localStorage.removeItem('paymentToken')
    navigate('/')
  }
  const { mutate: mutateTicket } = useTicket(
    COMPLETE_TICKET,
    onSuccess,
    onError
  )
  const typeBank = query.has('partnerCode') && query.get('partnerCode')
  const typePayment = 'ATM'
  const amount = query.has('amount') && query.get('amount')

  useLayoutEffect(() => {
    if (!ticket || Object.keys(ticket).length == 0) return navigate('/')

    const foodObject = filterData(
      ticket.foods,
      (food) => food.quantity > 0
    ).map((food) => {
      return {
        foodId: food._id,
        quantityFood: food.quantity,
        name: food.name,
        price: food.price
      }
    })

    mutateTicket({
      typeBank: typeBank,
      typePayment,
      amount,
      userId: ticket.userId,
      ticket_id: ticket.ticket_id,
      priceId: {
        _id: ticket?.price_id,
        price: ticket.price_movie
      },
      seatId: mapData(ticket.seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime,
      totalFood: ticket.totalFood
    })
  }, [])
  if (!query.has('partnerCode') || !query.has('amount')) {
    navigate('/')
    return
  }

  const override = {
    display: 'block',
    margin: '1.6rem auto'
  }

  return (
    <div className="h-[35vw] flex items-center ">
      <HashLoader cssOverride={override} color="#eb3656" />
    </div>
  )
}

export default PendingResult
