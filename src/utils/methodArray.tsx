import { FoodItemState } from '@/Interface/food'
import { SeatUserList } from '@/Interface/ticket'
import {
  APPROVAL_SCHEDULE,
  AVAILABLE_SCHEDULE,
  AVAILABLE_SCREEN,
  CANCELLED_SCHEDULE,
  CANCELLED_SCREEN,
  FULL_SCHEDULE,
  FULL_SCREEN,
  NORMAL,
  PAID_TICKET,
  RESERVED_TICKET,
  VIP
} from './constant'

export const filterSeat = (data: SeatUserList[]) => {
  return filterData(data, (s: SeatUserList) => s.selected).reduce(
    (acc: number, s: SeatUserList) => {
      return s.price + acc
    },
    0
  )
}
export const filterFood = (foods: FoodItemState[]) => {
  if (!foods) return
  return filterData(foods, (food: FoodItemState) => food.quantity > 0).reduce(
    (acc: number, s: FoodItemState) => {
      return s.price * s.quantity + acc
    },
    0
  )
}

export const filterData = (
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  data: any[] | null | undefined,

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  condition: (item: any) => boolean
) => {
  if (!data) return []
  return data.filter(condition)
}
export const getNameSeat = (
  data: SeatUserList[] | null | undefined,
  character: string
) => {
  return filterData(data, (seat) => seat.selected)
    .map((seat) => seat.name)
    .join(character)
}

export const mapData = (data: SeatUserList[] | null | undefined) => {
  if (!data) return
  const filteredData = data.filter((seat: SeatUserList) => seat.selected)
  return filteredData.map((seat: SeatUserList) => {
    return {
      _id: seat._id,
      typeSeat: seat.typeSeat,
      price: seat.price,
      row: seat.row,
      column: seat.column
    }
  })
}
export const filterStatusMovie = (status: string) => {
  switch (status) {
    case 'COMING_SOON':
      return 'Sắp Công Chiếu'
    case 'IS_SHOWING':
      return 'Đang Công Chiếu'
    case 'PRTMIERED':
      return 'Đã Công Chiếu'
    case 'CANCELLED':
      return 'Đã Hủy'
    default:
      return 'Sắp Công Chiếu'
  }
}
export const filterRole = (status: string) => {
  switch (status) {
    case 'user':
      return 'Khách hàng'
    case 'staff':
      return 'Nhân viên'
    case 'admin':
      return 'Admin'
    default:
      return 'Khách hàng'
  }
}
export const filterStatusShow = (status: string) => {
  switch (status) {
    case AVAILABLE_SCHEDULE:
      return 'Đang chiếu'
    case APPROVAL_SCHEDULE:
      return 'Chờ phê duyệt'
    case FULL_SCHEDULE:
      return 'Hết ghế'
    case CANCELLED_SCHEDULE:
      return 'Hủy'
    default:
      return 'Chờ phê duyệt'
  }
}
export const filterStatusRoom = (status: string) => {
  switch (status) {
    case AVAILABLE_SCREEN:
      return 'Phòng đang dùng'
    case CANCELLED_SCREEN:
      return 'Phòng đã hủy'
    case FULL_SCREEN:
      return 'Phòng đã đầy'
    default:
      return 'Phòng đang dùng'
  }
}
export const filterStatusCssText = (status: string) => {
  switch (status) {
    case AVAILABLE_SCHEDULE:
      return 'text-green-900'
    case APPROVAL_SCHEDULE:
      return 'text-orange-900'
    case FULL_SCHEDULE:
      return 'text-blue-800'
    case CANCELLED_SCHEDULE:
      return 'text-red-900'
    default:
      return 'Chờ phê duyệt'
  }
}
export const filterStatusTicket = (status: string) => {
  switch (status) {
    case PAID_TICKET:
      return 'Đã thanh toán'
    case RESERVED_TICKET:
      return 'Chưa thanh toán'

    default:
      return 'Đã thanh toán'
  }
}
export const filterStatusSeat = (status: string) => {
  switch (status) {
    case NORMAL:
      return 'Ghế thường'
    case VIP:
      return 'Ghế vip'

    default:
      return 'Ghế thường'
  }
}
export const filterStatusCssBg = (status: string) => {
  switch (status) {
    case AVAILABLE_SCHEDULE:
      return 'bg-green-200'
    case APPROVAL_SCHEDULE:
      return 'bg-orange-200'
    case FULL_SCHEDULE:
      return 'bg-blue-300'
    case CANCELLED_SCHEDULE:
      return 'bg-red-200'
    default:
      return 'Chờ phê duyệt'
  }
}
