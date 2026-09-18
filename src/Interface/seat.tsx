import { Screeningrooms } from './screeningrooms'
import { TimeSlot } from './timeslots'

export interface Seat {
  _id: string
  name: string
  typeSeat: string
  price: number
  row: number
  column: number
  status: string
  ScreeningRoomId: Screeningrooms[]
  ShowScheduleId: string[]
  TimeSlotId: TimeSlot[]
  createdAt: string
  updatedAt: string
}
