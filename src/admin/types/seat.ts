export interface Seat {
    _id?: string;
    typeSeat: 'normal' | 'VIP';
    price: number;
    row: number;
    column: number;
    status: 'Available' | 'Sold' | 'Reserved' | 'Unavailable';
    ScreeningRoomId: string;
    ShowScheduleId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FormSeatAdd {
    typeSeat: | 'Unavailable' | 'normal' | 'VIP';
    price: number;
    row: number;
    column: number;
    status: 'Available' | 'Sold' | 'Reserved' | 'Unavailable';
    ScreeningRoomId: string;
    ShowScheduleId: string;
}
