export interface MovieShowType {
  message: string
  data: Data
}

export interface Data {
  _id: string
  name: string
  image: string
  duration: number
  country: string
  age_limit: number
  fromDate: string
  toDate: string
  author: string
  language: string
  actor: string
  trailer: string
  desc: string
  status: string
  rate: number
  prices: string[]
  slug: string
  destroy: boolean
  createdAt: Date
  updatedAt: Date
  categoryCol: CategoryCol[]
  showTimeCol: ShowTimeCol[]
  moviePriceCol: MoviePriceCol[]
  showTimeDimension: Array<ShowTimeDimension[]>
}

export interface CategoryCol {
  _id: string
  name: string
}

export interface MoviePriceCol {
  _id: string
  price: number
  dayType: string
}

export interface ShowTimeCol {
  date: Date
  timeFrom: string
  timeTo: string
  cinemaId: CinemaID
  screenRoomId: ScreenRoomID
  status: string
}

export interface CinemaID {
  _id: string
  CinemaName: string
  CinemaAdress: string
}

export interface ScreenRoomID {
  _id: string
  name: string
  CinemaId: CinemaID
  status: string
  destroy: boolean
}

export interface ShowTimeDimension {
  _id: string
  screenRoomId: string
  date: Date
  timeFrom: string
  timeTo: string
  status: string
  destroy: boolean
}
