export interface Cinema {
    _id: string
    CinemaName: string
    CinemaAdress: string
    ScreeningRoomId: string[] | string
    slug: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface FormCinemaAdd {
    CinemaName: string,
    CinemaAdress: string,
    // ScreeningRoomId: string[] | string,
  }
  