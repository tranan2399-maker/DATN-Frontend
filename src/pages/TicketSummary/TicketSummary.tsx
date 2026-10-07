import { TicketType } from '@/store/ticket'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Armchair, Cookie, ArrowRight, Film, X } from 'lucide-react'

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

function TicketSummary({ isStitched = false }: { isStitched?: boolean }) {
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

  const { mutate } = usePaymentMuatation(paymentMethod?._id || 0, onSuccessPayment)
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
  } = ticket || {}

  const totalFoodPrice =
    foods && foods.length != 0
      ? filterFood(foods)
      : ticket?.foods
        ? filterFood(ticket?.foods || [])
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
    if (!isLogined || !userDetail?.message?._id) {
      toast.warn('Vui lòng đăng nhập Để tiến hành đặt vé!', {
        position: 'top-right'
      })
      return
    }
    if (seat.length == 0) {
      toast.error('Vui lòng chọn chỗ ngồi !', {
        position: 'top-right'
      })
      return
    }
    const showtime = dataShowtime?.[0]
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

    if (isStitched) {
    return (
      <div className="w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-5 md:p-6 shadow-xl sticky top-24 space-y-5">
        {/* Header Movie Info */}
        <div className="flex gap-4 pb-4 border-b border-white/[0.06]">
          {image_movie ? (
            <img
              src={image_movie}
              alt={name_movie}
              className="w-20 h-28 object-cover rounded-xl shadow-md border border-white/10 shrink-0"
            />
          ) : (
            <div className="w-20 h-28 bg-[#1F1F24] rounded-xl flex items-center justify-center text-[#71717A] shrink-0">
              <Film className="w-8 h-8" />
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-1">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#E50914]/15 border border-[#E50914]/30 text-[#ff8080] text-[10px] font-bold uppercase tracking-wider">
              3D Digital
            </span>
            <h3 className="text-base font-bold text-white truncate font-headline leading-tight">
              {name_movie || 'Chưa chọn phim'}
            </h3>
            <p className="text-xs text-[#A8A8B3]">
              {convertMintuteToHour(duration_movie)}
            </p>
            <p className="text-xs text-[#ffd484] font-medium truncate">
              {cinema_name || 'Dream Cinema'}
            </p>
          </div>
        </div>

        {/* Showtime Details */}
        <div className="space-y-2.5 text-xs text-[#A8A8B3]">
          <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
            <span className="text-[#71717A]">Phòng chiếu:</span>
            <span className="font-semibold text-white">{hall_name || '--'}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
            <span className="text-[#71717A]">Suất chiếu:</span>
            <span className="font-semibold text-white">
              {time_from ? convertAmPm(getHourAndMinute(time_from)) + ' • ' + convertDayToFormatVN(getDay(time_from)) : '--'}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
            <span className="text-[#71717A]">Số lượng vé:</span>
            <span className="font-semibold text-white">
              {seat && seat.length !== 0 ? seat.filter((s) => s.selected).length : ticketAmount || 0} vé
            </span>
          </div>
        </div>

        {/* Selected Seats Chips */}
        <div>
          <span className="text-xs text-[#71717A] block mb-2">Ghế đang chọn:</span>
          {seat && seat.filter((s) => s.selected).length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {seat.filter((s) => s.selected).map((s) => (
                <span
                  key={s._id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E50914] text-white text-xs font-bold shadow-sm"
                >
                  {s.name}
                  <X
                    className="w-3 h-3 cursor-pointer hover:opacity-80"
                    onClick={() => {
                      const updated = seat.map((item) =>
                        item._id === s._id ? { ...item, selected: false } : item
                      )
                      dispatch(ticketAction.addProperties({ seat: updated }))
                    }}
                  />
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#71717A] italic">Chưa chọn ghế nào</p>
          )}
        </div>

        {/* Food Items if any */}
        {foodValid.length > 0 && (
          <div className="pt-2 border-t border-white/[0.04] space-y-1">
            <span className="text-xs text-[#71717A] block mb-1">Bắp nước:</span>
            {foodValid.map((f) => (
              <div key={f._id} className="flex justify-between text-xs text-[#A8A8B3]">
                <span>{f.name} x{f.quantity}</span>
                <span className="text-white font-medium">{formatVND(f.price * f.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Grand Total */}
        <div className="pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8A8B3]">
            Tổng thanh toán:
          </span>
          <span className="text-xl font-bold font-headline text-[#ffd484]">
            {formatVND(total)}
          </span>
        </div>

        {/* Primary Action Button */}
        {pathname === '/purchase/seat' && (
          <button
            type="button"
            disabled={isPending || (seat ? seat.filter((s) => s.selected).length === 0 : true)}
            onClick={handlePurchaseSeat}
            className="w-full py-3.5 px-4 rounded-xl stitch-btn-primary flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            {isPending ? (
              <BarLoader color="#FFFFFF" width={80} />
            ) : (
              <>
                <span>Tiếp tục: Chọn bắp nước</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        {pathname === '/purchase/food' && (
          <button
            type="button"
            onClick={handlePurchaseFood}
            className="w-full py-3.5 px-4 rounded-xl stitch-btn-primary flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            <span>Tiếp tục: Thanh toán</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {pathname === '/purchase/payment' && paymentMethod._id !== 3 && (
          <button
            type="button"
            onClick={handlePurchasePayment}
            className="w-full py-3.5 px-4 rounded-xl stitch-btn-primary flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            <span>Thanh toán vé</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {pathname === '/purchase/payment' && paymentMethod._id === 3 && (
          <DialogPayment isLoading={isLoading} dataShowtime={dataShowtime} />
        )}
      </div>
    )
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
