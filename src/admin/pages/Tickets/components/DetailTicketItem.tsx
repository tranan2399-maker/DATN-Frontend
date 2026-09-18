import { TICKET } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/admin/components/Loading/Loading'
import { getDetailTicket } from '@/api/ticket'
import {
  addCommasToNumber,
  getDay,
  getHourAndMinute,
  selectCalendar
} from '@/utils'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { filterStatusSeat, filterStatusTicket } from '@/utils/methodArray'

function DetailTicketItem({ ticketId }: { ticketId: string }) {
  const { data: dataTicket, isLoading } = useQuery({
    queryKey: [TICKET, ticketId],
    queryFn: () => getDetailTicket(ticketId)
  })

  if (isLoading) return <Loading />
  const {
    movieId: { image: imageMovie = '', name: nameMovie = '', categoryId = [] },
    priceId: { price: priceMovie },
    userId: { name: nameUser = '', email: emailUser = '' },
    cinemaId: { CinemaName, CinemaAdress },
    screenRoomId: { name: nameScreen },
    showtimeId: { timeFrom, timeTo },
    seatId,
    foods,
    totalFood,
    // paymentId: { typeBank = '', typePayment = '', createdAt='' },
    orderNumber = 0,
    status = '',
    quantity = 0,
    totalPrice = 0
  } = dataTicket[0]
  const totalSeat = seatId.reduce((acc: number, seat: { price: number }) => {
    return acc + seat.price
  }, 0)
  return (
    <div className="flex flex-col gap-5 ">
      <div>
        <img src={imageMovie} width={100} alt="" />
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1  gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Mã vé : {orderNumber}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tên phim : {nameMovie}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Giá phim : {addCommasToNumber(priceMovie)}
        </p>
      </div>
      <p className="bg-white flex items-center p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
        Thể loại :{' '}
        {categoryId?.map((cate: { name: string; _id: string }) => {
          return (
            <div
              className="mx-2 bg-primaryAdmin rounded text-white px-2 py-1"
              key={cate._id}
            >
              {cate.name}
            </div>
          )
        })}
      </p>
      <div className="grid grid-cols-2 gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tên khách hàng : {nameUser}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Email : {emailUser}
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Phòng chiếu : {nameScreen}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tên rạp : {CinemaName}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Địa chỉ : {CinemaAdress}
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngày chiếu : {getDay(timeFrom)}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Giờ chiếu : {getHourAndMinute(timeFrom)}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Giờ kết thúc : {getHourAndMinute(timeTo)}
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-3">
        <p className="bg-white p-5 flex items-center shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ghế :{' '}
          {seatId?.map(
            (seat: {
              row: number
              column: number
              _id: string
              typeSeat: string
            }) => {
              return (
                <div
                  className="mx-2 bg-primaryAdmin rounded text-white px-2 py-1"
                  key={seat._id}
                >
                  {convertNumberToAlphabet(seat.row)}
                  {seat.column} ({filterStatusSeat(seat.typeSeat)})
                </div>
              )
            }
          )}
        </p>

        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tổng tiền : {addCommasToNumber(totalSeat)}
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-3">
        <p className="bg-white p-5 flex items-center shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Đồ ăn :
          {foods?.map(
            (food: { name: string; _id: string; quantityFood: number }) => {
              return (
                <div
                  className="mx-2 bg-primaryAdmin rounded text-white px-2 py-1"
                  key={food._id}
                >
                  {food.name} ({food.quantityFood})
                </div>
              )
            }
          )}
        </p>

        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tổng tiền : {addCommasToNumber(totalFood) ?? 'Chưa thanh toán'}
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-3">
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngân hàng thanh toán :{' '}
          {dataTicket[0]?.paymentId?.typeBank ?? 'Chưa thanh toán'}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Loại thẻ :{' '}
          {dataTicket[0]?.paymentId?.typePayment ?? 'Chưa thanh toán'}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Ngày :{' '}
          {selectCalendar(dataTicket[0]?.paymentId?.createdAt) ??
            'Chưa thanh toán'}
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-3">
        <p className="bg-white flex items-center p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Trạng thái :
          <div className="ms-2 bg-primaryAdmin rounded text-white px-2 py-1">
            {filterStatusTicket(status)}
          </div>
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Số lượng vé : {quantity}
        </p>
        <p className="bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke">
          Tổng tiền : {addCommasToNumber(totalPrice)}
        </p>
      </div>
    </div>
  )
}

export default DetailTicketItem
