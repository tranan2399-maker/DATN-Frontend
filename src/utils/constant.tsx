export const MOVIE_DETAIL = 'MOVIE_DETAIL'
export const MOVIE = 'MOVIE'
export const AVAILABLE = 'Available'
export const COMING_SOON_MOVIE = 'COMING_SOON'

export const FOOD = 'FOOD'

export const AVAILABLE_SEAT = 'Available'

// Ghế đã được người dùng chọn, đặt và thanh toán thành công.
//Đây là trạng thái khi vé đã được bán và ghế không còn khả dụng cho việc đặt chỗ.
export const SOLD = 'Sold'

// Ghế đã được người dùng chọn và đặt, nhưng chưa thanh toán.
//Trong thời gian đặt ghế, người dùng có quyền hoàn tác đặt ghế hoặc thanh toán để xác nhận.
export const RESERVED = 'Reserved'

//Ghế không khả dụng cho việc đặt chỗ, có thể do nó đã bị đặt trước đó cho một suất chiếu khác
//hoặc vấn đề kỹ thuật khác
export const UNAVAILABLE = 'Unavailable'
export const TICKET = 'TICKET'
export const statusSeat = [AVAILABLE, SOLD, RESERVED, UNAVAILABLE]

export const SEAT_STORE = 'seat'
export const CREATE_TICKET = 'CREATE_TICKET'
export const COMPLETE_TICKET = 'COMPLETE_TICKET'
export const DELETE_TICKET = 'DELETE_TICKET'
export const SHOW_TIMES = 'SHOW_TIMES'

export const USERDETAIL = 'USERDETAIL'
export const WATCHLIST = 'WATCHLIST'
// comment
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const REPLY_COMMENT = 'REPLY_COMMENT'
export const COMMENT = 'COMMENT'
export const LIKE_COMMENT = 'LIKE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_GOOGLE = 'SIGN_IN_GOOGLE'
export const PAYMENT = 'payment'
export const CANCELLED_SHOW = 'Cancelled'
export const APPROVAL_SHOW = 'APPROVAL_SHOW'
export const SHOWTIMES_ADMIN = 'SHOWTIMES'
// show time
export const AVAILABLE_SCHEDULE = 'Available'
export const APPROVAL_SCHEDULE = 'Approval'
export const FULL_SCHEDULE = 'Full'
export const CANCELLED_SCHEDULE = 'Cancelled'
export const ROLE_ADMIN = '659b79c6757ca91b82e2b9d0'
export const ROLE_STAFF = '662ce317888a9655fbf8192e'
export const ROLE_USER = '659919a451a235a0f4b80700'

export const API_GOOGLE = 'https://www.googleapis.com/oauth2/v3/userinfo'
// room
export const AVAILABLE_SCREEN = 'Available'
export const CANCELLED_SCREEN = 'Cancelled'
export const FULL_SCREEN = 'Full'
//ticket
export const PAID_TICKET = 'PAID'
export const RESERVED_TICKET = 'RESERVED'
// seat
export const NORMAL = 'normal'
export const VIP = 'VIP'


