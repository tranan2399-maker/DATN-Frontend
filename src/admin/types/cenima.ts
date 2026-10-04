export interface Cinema {
  _id: string
  name?: string
  address?: string
  CinemaName: string
  CinemaAdress: string
  city?: string
  amenities?: string[]
  hotline?: string
  imageUrl?: string
  badge?: string
  ScreeningRoomId: string[] | string
  slug?: string
  createdAt: Date
  updatedAt: Date
}

export interface FormCinemaAdd {
  name?: string
  address?: string
  CinemaName: string
  CinemaAdress: string
  city?: string
  amenities?: string[]
  hotline?: string
  imageUrl?: string
  badge?: string
}
