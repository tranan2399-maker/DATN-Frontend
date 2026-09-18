import { Seat } from "@/admin/types/seat"
import { Data } from "./movieDetail"



export interface Screeningrooms {
  _id?: string
  name: string
  NumberSeat: number
  // ShowtimesId?: string[]
  projector: string
  // CinemaId: Cinema,
  CinemaId: string
  ShowtimesId: Showtimes[]
  status: string
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface Showtimes{
  _id: string
  screenRoomId:string
  movieId: Data
  date:string
  timeFrom: string
  timeTo:string
  status: string
  SeatId: Seat
  destroy: boolean
  createdAt: string
  updatedAt: string
}

export interface AddandEditRooms {
  name: string
  projector: string
  CinemaId: string
  status: string

  // ShowtimesId: string
  // CinemaId:CinemaRooms
  // ShowtimesId: ShowTimeRooms
}
export interface AddandEditRoomsType {
  name: string
  NumberSeat:number
  projector: string
  status?: string

  // ShowtimesId: string
  // CinemaId:CinemaRooms
  // ShowtimesId: ShowTimeRooms
}