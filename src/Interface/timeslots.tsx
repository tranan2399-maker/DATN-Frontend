import { Seat } from './seat'

export interface TimeSlot {
  _id: string
  ScreenRoomId: string[]
  Show_scheduleId: string[]
  SeatId: Seat[]
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}
