import { TicketType } from '@/store/ticket'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Armchair, Cookie } from 'lucide-react'

import {
  convertAmPm,
  convertDayToFormatVN,
  convertMintuteToHour,
  formatVND,
  getDay,
  getHourAndMinute
} from '@/utils'
import { useLocalStorage } from '@uidotdev/usehooks'
import { SeatUserList, TicketSelector } from '@/Interface/ticket'
import { useNavigate } from 'react-router-dom'
import {
  Hall,
  Location,
  PaymentMethod,
  ShowDate,
  ShowTime,
  TicketAmount
} from './IconTicket'

import { FoodItemState } from '@/Interface/food'
import { FoodSelector, foodsAction } from '@/store/food'
import { useLocation } from 'react-router-dom'
import TicketItem from './Ticket/TicketItem'
import TicketList from './Ticket/TicketList'

import { useQueryClient } from '@tanstack/react-query'
import DialogPayment from '../modals/DialogPayment'
import {
  filterSeat,
  filterFood,
  filterData,
  mapData
} from '@/utils/methodArray'
import useTicket from '@/hooks/useTicket'
import { CREATE_TICKET, FULL_SCHEDULE, PAYMENT } from '@/utils/constant'
import { useShowtime } from '@/hooks/useShowtime'
import TimeCountDown from './TimeCountDown'
import BarLoader from 'react-spinners/BarLoader'
import { useContext } from 'react'
import { ContextMain } from '@/context/Context'
import usePaymentMuatation, {
  MutatePaymentType
} from '@/hooks/usePaymentMuatation'
import useAllFood from '@/hooks/useAllFood'

function TicketSummary() {
  const dispatch = useDispatch()
  const { data: dataFoodApi } = useAllFood()
  const { userDetail } = useContext(ContextMain)
  const queryClient = useQueryClient()
  const { seat, paymentMethod } = useSelector(
    (state: TicketSelector) => state.ticket.ticket
  )

  const foods = useSelector((state: FoodSelector) => state.foods.foods)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const { isLoading, data: dataShowtime } = useShowtime(
    ticket?.id_showtime?._id || ''
  )
  const foodValid = foods.filter((food: FoodItemState) => food.quantity > 0)

  const onSuccess = (data: { _id: string; paymentToken: string }) => {
    setTicket({
      ...ticket,
      ticket_id: data._id
    })
    localStorage.setItem('paymentToken', data.paymentToken)
    navigate('/purchase/food')
  }
  const { mutate: mutateTicket, isPending } = useTicket(
    CREATE_TICKET,
    onSuccess
  )
  const onSuccessPayment = (data: { data: string }) => {
    if (data?.data) {
      window.location.replace(data?.data)
    }
    queryClient.invalidateQueries({ queryKey: [PAYMENT] })
  }

  const { mutate } = usePaymentMuatation(paymentMethod._id, onSuccessPayment)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const {
    hall_name = '',
    image_movie = '',
    time_from = '',
    name_movie = '',
    duration_movie = 0,
    cinema_name = '',
    price_movie = 0,
    seat: seatStorage = [],
    foods: foodsTicket = [],
    ticketAmount = 0
  } = ticket

  const totalFoodPrice =
    foods && foods.length != 0
      ? filterFood(foods)
      : ticket.foods
        ? filterFood(ticket.foods)
        : 0
  const totalSeatPrice =
    seat && seat.length > 0
      ? filterSeat(seat)
      : seatStorage
        ? filterSeat(seatStorage)
        : 0
  const total = totalSeatPrice + price_movie + totalFoodPrice

  const mapDataSeat = (data: SeatUserList[]) => {
    const filteredData = data.filter((seat: SeatUserList) => seat.selected)
    return filteredData.map((seat: SeatUserList) => seat.name).join(', ')
  }

  const handlePurchaseSeat = () => {
    if (seat.length == 0) {
      toast.error('Vui lòng chọn chỗ ngồi !', {
        position: 'top-right'
      })
      return
    }
    const showtime = dataShowtime[0]
    if (!showtime || showtime.status == FULL_SCHEDULE || showtime.destroy) {
      toast.error('Thời gian chiếu không có sẵn', {
        position: 'top-right'
      })
      return
    }

    setTicket({
      ...ticket,
      seat: [...seat],
      total,
      userId: userDetail?.message?._id || '1',
      ticketAmount: seat.filter((s) => s.selected).length
    })
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
    const newObject = {
      priceId: {
        _id: ticket?.price_id,
        price: ticket.price_movie
      },
      seatId: mapData(seat),
      foods: foodObject,
      showtimeId: ticket.id_showtime,
      userId: userDetail?.message?._id || '1',
      movieId: ticket.id_movie,
      screenRoomId: ticket.hall_id,
      cinemaId: ticket.cinemaId
    }

    if (ticket.ticket_id !== '') {
      mutateTicket({
        ...newObject,
        ticket_id: ticket.ticket_id
      })
      return
    }
    mutateTicket({
      ...newObject
    })
  }
  const handlePurchaseFood = () => {
    if (foods) {
      setTicket({
        ...ticket,
        total,
        foods: [...foods],
        totalFood: totalFoodPrice
      })
    }

    navigate('/purchase/payment')
  }
  const handlePurchasePayment = () => {
    const showtime = dataShowtime[0]
    if (showtime.status == FULL_SCHEDULE || showtime.destroy) {
      toast.error('Thời gian chiếu không có sẵn', {
        position: 'top-right'
      })
      return
    }
    const allFood = dataFoodApi.map((food: { _id: string }) => food._id)
    const chooseFood = foodValid.map((food: { _id: string }) => food._id)

    if (!allFood.includes(...chooseFood)) {
      toast.error('Đồ ăn không tồn tại', {
        position: 'top-right'
      })
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { foods, ...rest } = ticket
      setTicket({
        ...rest
      })
      // dispatch(foodsAction.fetchData(dataFoodApi))
      navigate('/purchase/food')
      return
    }
    if (paymentMethod._id == 1) {
      mutate({
        amount: ticket.total,
        bankCode: 'NCB',
        language: 'vn'
      } as MutatePaymentType)
    } else if (paymentMethod._id == 2) {
      mutate({
        amount: ticket.total
      } as MutatePaymentType)
    }
  }

  return (
    <div className="purchase-section-right ticket_summary ">
      <h2 className="ticket-container-heading">Tổng hợp vé</h2>

      <div className="ticket-container md:sticky md:top-0">
        <div className="ticket-heading">
          <div className="ticket-movie-img-cont">
            <img
              className="ticket-movie-img"
              src={image_movie}
              alt="selected movie image"
            />
          </div>

          <div className="ticket-primary-info">
            <div className="flex items-center justify-between w-full">
              <p className="ticket-movie-screen">3D </p>
              {ticket && ticket.ticket_id && <TimeCountDown />}
            </div>
            <p className="ticket-movie-name">{name_movie}</p>
            <p className="ticket-movie-dur">
              {convertMintuteToHour(duration_movie)}
            </p>
          </div>
        </div>

        <div className="ticket-info">
          <ul className="ticket-info-list">
            <TicketItem
              icon={<Location />}
              title={'Địa chỉ'}
              name={cinema_name}
            />
            <TicketItem
              icon={<ShowDate />}
              title={'Ngày chiếu'}
              name={convertDayToFormatVN(getDay(time_from))}
            />
            <TicketItem
              icon={<Hall />}
              title={'Phòng chiếu'}
              name={hall_name}
            />
            <TicketItem
              icon={<ShowTime />}
              title={'Giờ chiếu'}
              name={convertAmPm(getHourAndMinute(time_from))}
            />
            <TicketItem
              icon={<TicketAmount />}
              title={'Số lượng vé'}
              name={
                seat && seat.length != 0
                  ? seat.filter((s) => s.selected).length
                  : ticketAmount
                    ? ticketAmount
                    : '--'
              }
            />
            <TicketItem
              icon={<Armchair size={16} />}
              title={'Ghế'}
              name={
                seat && seat.length != 0
                  ? mapDataSeat(seat)
                  : seatStorage && seatStorage.length > 0
                    ? mapDataSeat(seatStorage)
                    : '--'
              }
            />

            <TicketList
              icon={<Cookie size={16} />}
              title={'Đồ ăn'}
              valueState={foodValid}
              valueStorage={foodsTicket}
            />
            <TicketItem
              icon={<PaymentMethod />}
              title={'Phương thức thanh toán'}
              name={paymentMethod.name}
            />
            <TicketItem
              icon={<PaymentMethod />}
              title={'Tổng tiền'}
              name={formatVND(total)}
            />
          </ul>
        </div>
        {pathname == '/purchase/food' && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchaseFood}
          >
            Chọn đồ ăn
          </button>
        )}

        {pathname == '/purchase/seat' && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchaseSeat}
          >
            {isPending ? <BarLoader color="#e6e6e8" /> : 'Chọn ghế'}
          </button>
        )}
        {pathname == '/purchase/payment' && paymentMethod._id !== 3 && (
          <button
            className="ticket-btn disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handlePurchasePayment}
          >
            Thanh toán vé
          </button>
        )}
        {pathname == '/purchase/payment' && paymentMethod._id == 3 && (
          <DialogPayment isLoading={isLoading} dataShowtime={dataShowtime} />
        )}
      </div>
    </div>
  )
}

export default TicketSummary
