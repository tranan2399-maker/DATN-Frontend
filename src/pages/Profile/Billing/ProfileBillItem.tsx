import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  addCommasToNumber,
  convertAmPm,
  convertDayToFormatVN,
  getDay,
  getHourAndMinute
} from '@/utils'
import { convertNumberToAlphabet } from '@/utils/seatAlphaIndex'
import { TicketBill, TicketFoodBill, TicketSeatBill } from '@/Interface/ticket'
function ProfileBillItem({ data }: { data: TicketBill }) {
  return (
    <div className="flex sm:flex-row xs:flex-col xs:relative md:static overflow-hidden rounded-xl">
      <div className=" md:basis-1/4 rounded-xl overflow-hidden xs:absolute top-[-40px] left-0 md:static -z-10 after:content-['*'] after:absolute md:after:hidden  after:top-0 after:left-0 after:bg-black after:opacity-65 after:w-full after:h-full">
        <img className="object-contain" src={data.movieId.image} alt="" />
      </div>
      <div className="flex flex-col md:ms-8 xs:ms-0 flex-1  overflow-hidden md:bg-background-secondary xs:p-2 sm:p-5 sm:px-7 rounded-xl">
        <Tabs defaultValue="account" className="">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-background-main sm:opacity-95 md:opacity-100">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-background-secondary data-[state=active]:text-primary-movieColor text-2xl font-semibold"
            >
              Thông tin
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-background-secondary text-2xl data-[state=active]:text-primary-movieColor font-semibold"
              value="password"
            >
              Thanh toán
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="mb-5">
              <h3 className="text-2xl">{data.cinemaId.CinemaName} </h3>
              <p className="text-xl">{data.cinemaId.CinemaAdress} </p>
            </div>
            <div>
              <h3 className="text-2xl">{data.movieId.name}</h3>
              <p className="text-xl">
                {data.movieId.categoryId
                  .map((category: { name: string }) => category.name)
                  .join(', ')}
              </p>
            </div>

            <div className="flex my-5 w-full justify-between py-3 px-4 border-t border-b border-dashed border-t-primary-movieColor border-b-primary-movieColor">
              <div className="flex flex-col items-center">
                <span className="text-2xl">Phòng</span>
                <div className="text-xl flex gap-2">
                  {data.screenRoomId.name}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">Giờ chiếu</span>
                <span className="text-xl">
                  {convertAmPm(getHourAndMinute(data?.showtimeId?.timeFrom))}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">Ngày chiếu</span>
                <span className="text-xl">
                  {convertDayToFormatVN(getDay(data?.showtimeId?.timeFrom))}
                </span>
              </div>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-2xl">Ghế</span>
                  <span className="text-2xl">
                    {data.seatId.map((seat: TicketSeatBill) => {
                      const row = convertNumberToAlphabet(seat.row)
                      return (
                        <span key={seat._id} className="mr-1">
                          {row}
                          {seat.column}
                          {seat.typeSeat === 'VIP' && 'VIP'},
                        </span>
                      )
                    })}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-2xl">Đồ ăn</span>
                  <span className="text-2xl">
                    {data.foods.map((food: TicketFoodBill) => {
                      return (
                        <span key={food._id} className="mr-2">
                          {food.name}( {food.quantityFood} ),
                        </span>
                      )
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <ul className="px-4">
              <li className="text-2xl flex justify-between mb-3 mt-8">
                <span>Mã vé</span>
                <span>{data.orderNumber}</span>
              </li>
              <li className="text-2xl flex justify-between  mt-5">
                <span>Ngày thanh toán</span>
                <span>{data.createdAt}</span>
              </li>
            </ul>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                    Thẻ
                  </TableHead>
                  <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                    Phim
                  </TableHead>
                  <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                    Ghế
                  </TableHead>
                  <TableHead className="text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                    Đồ ăn
                  </TableHead>
                  <TableHead className="text-right text-primary-movieColor py-4 sm:text-[14px] xs:text-[12px]">
                    Tổng
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="sm:text-[14px] xs:text-[12px]">
                    {data?.paymentId?.typeBank || 'Bank'}
                  </TableCell>
                  <TableCell className="sm:text-[14px] xs:text-[12px]">
                    {addCommasToNumber(data?.priceId?.price) || 0}
                  </TableCell>
                  <TableCell className="sm:text-[14px] xs:text-[12px]">
                    {addCommasToNumber(data.seatId.reduce(
                      (acc: number, seat: { price: number }) =>
                        seat.price + acc,
                      0
                    ))}
                  </TableCell>
                  <TableCell className="sm:text-[14px] xs:text-[12px]">
                    {addCommasToNumber(data.foods.reduce(
                      (
                        acc: number,
                        food: { price: number; quantityFood: number }
                      ) => food.price * food.quantityFood + acc,
                      0
                    ))}
                  </TableCell>
                  <TableCell className="text-right sm:text-[14px] xs:text-[12px]">
                    {addCommasToNumber(data.totalPrice)}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-background-main  overflow-hidden sm:opacity-85 md:opacity-100">
                <TableRow className="">
                  <TableCell
                    colSpan={4}
                    className="rounded-bl-xl sm:text-[14px] xs:text-[12px]"
                  >
                    Tổng tiền
                  </TableCell>
                  <TableCell className="text-right rounded-br-xl sm:text-[14px] xs:text-[12px]">
                    {addCommasToNumber(data.totalPrice)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfileBillItem
