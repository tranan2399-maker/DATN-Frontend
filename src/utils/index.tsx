import { MovieType } from '@/Interface/movie'
import { MyObjectComment } from '@/hooks/useNode'
import { Value } from 'node_modules/react-time-picker/dist/esm/shared/types'

export function countComments(comment: MyObjectComment | undefined): number {
  if (comment && Object.keys(comment).length == 0) return 0
  let count = 1 // Bắt đầu từ 1 để tính cả chính đối tượng cha
  if (comment?.comments) {
    for (const subComment of comment.comments) {
      count += countComments(subComment) // Đệ quy cho từng phần tử con
    }
  }
  return count
}
// Lấy giờ không lấy ngày VD 19:30
export const getHourAndMinute = (date: string | undefined) => {
  if (!date || date.toString().length === 0) {
    return ''
  }
  const hourAndMinute = date.split(' ')[1]
  return hourAndMinute
}
export const convertAmPm = (date: string | undefined) => {
  if (date === undefined) return
  const [gio, phut] = date.split(':')

  // Chuyển đổi giờ sang số nguyên
  let hour = parseInt(gio, 10)

  // Xác định AM hoặc PM
  const buoi = hour >= 12 ? 'PM' : 'AM'

  // Chuyển đổi giờ sang định dạng 12 giờ
  hour = hour % 12 || 12

  // Định dạng giờ và phút thành chuỗi "hh:mm AM/PM"
  const gioPhutDinhDang =
    gio.toString().padStart(2, '0') + ':' + phut.padStart(2, '0') + ' ' + buoi
  return gioPhutDinhDang
}
// Lấy ngày không lấy giờ VD 12-09-2023
export const getDay = (date: string | undefined) => {
  if (date === undefined) return
  if (date.toString().length === 0) {
    return
  }
  return date.split(' ')[0]
}
// Chuyển ngày sang định dạng chữ August 19, 2023
export function chuyenDoiNgayDauVao(inputDate: string | undefined) {
  if (inputDate === undefined) return
  // Tách ngày, tháng và năm từ chuỗi đầu vào
  const [ngay, thang, nam] = inputDate.split('-')

  // Tạo đối tượng Date từ ngày, tháng và năm
  const dateObj = new Date(Number(nam), Number(thang) - 1, Number(ngay)) // Tháng bắt đầu từ 0

  // Định dạng lại ngày thành chuỗi "MMM dd, yyyy"
  const ngayDinhDang = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return ngayDinhDang
}

export function chuyenDoiNgay(dateString: Date | string) {
  if (dateString == '') return
  const ngay = new Date(dateString)

  const ngayTrongTuan = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy'
  ]
  const thu = ngayTrongTuan[ngay.getDay()]

  const ngayTrongThang = ngay.getDate()

  const thangTrongNam = ngay.getMonth() + 1 // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
  const tenThang = [
    'tháng 1',
    'tháng 2',
    'tháng 3',
    'tháng 4',
    'tháng 5',
    'tháng 6',
    'tháng 7',
    'tháng 8',
    'tháng 9',
    'tháng 10',
    'tháng 11',
    'tháng 12'
  ]
  const tenThangHienThi = tenThang[thangTrongNam - 1]

  return `${thu}, ${ngayTrongThang} ${tenThangHienThi}`
}
// 01-02-2024
export function chuyenDoiThu(dateString: string | undefined) {
  if (!dateString) return
  const parts = dateString.split('.')
  const ngay = parseInt(parts[0], 10) // Phải chuyển về kiểu số nguyên
  const thang = parseInt(parts[1], 10) - 1 // Phải chuyển về kiểu số nguyên và trừ đi 1 vì tháng bắt đầu từ 0
  const nam = parseInt(parts[2], 10)

  // Tạo đối tượng Date từ ngày, tháng, năm
  const date = new Date(nam, thang, ngay)

  // Mảng chứa tên của các thứ trong tuần
  const thuArray = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy'
  ]

  // Lấy thứ của ngày
  const thu = thuArray[date.getDay()]

  return thu
}
export function formatDateToISOString(dateString: string) {
  // Phân tách ngày và giờ từ chuỗi đầu vào
  const [datePart, timePart] = dateString.split(' ')

  // Phân tách ngày thành các phần riêng biệt (ngày, tháng, năm)
  const [day, month, year] = datePart.split('-').map(Number)

  // Phân tách giờ thành các phần riêng biệt (giờ, phút)
  const [hour, minute] = timePart.split(':').map(Number)

  // Tạo đối tượng Date mới từ các phần được phân tách
  const date = new Date(year, month - 1, day, hour, minute)

  // Chuyển đổi đối tượng Date sang định dạng ISO 8601
  const isoString = date.toISOString()

  return isoString
}
// Lấy ngày theo lịch
export function selectCalendar(inputDate: Date | undefined) {
  if (inputDate === undefined) return
  // Tạo đối tượng Date từ chuỗi ngày đầu vào
  const dateObj = new Date(inputDate)

  // Lấy ngày, tháng và năm từ đối tượng Date
  const ngay = dateObj.getDate()
  const thang = dateObj.getMonth() + 1 // Tháng bắt đầu từ 0
  const nam = dateObj.getFullYear()

  // Lấy giờ và phút từ đối tượng Date
  const gio = dateObj.getHours()
  const phut = dateObj.getMinutes()

  // Định dạng lại ngày và giờ thành chuỗi "dd-MM-yyyy HH:mm"
  const ngayDinhDang =
    ngay.toString().padStart(2, '0') +
    '-' +
    thang.toString().padStart(2, '0') +
    '-' +
    nam
  const gioPhutDinhDang =
    gio.toString().padStart(2, '0') + ':' + phut.toString().padStart(2, '0')

  // Tạo chuỗi kết quả
  const ketQua = ngayDinhDang + ' ' + gioPhutDinhDang

  return ketQua
}
export const checkSlidePerView = (data: MovieType[], slide: number) => {
  return data?.length > 0 ? (data.length > slide ? slide : data.length) : 0
}
export function convertMintuteToHour(phut: number) {
  // Tính số giờ
  const gio = Math.floor(phut / 60)

  // Tính số phút còn lại sau khi chia lấy dư
  const phutConLai = phut % 60
  if (phutConLai === 0) {
    return gio + 'h '
  }

  // Trả về chuỗi kết quả
  return gio + 'h ' + phutConLai + 'm'
}

export function getFourConsecutiveDays() {
  return [...Array(4)].map((_, i) => new Date(Date.now() + i * 86400000))
}
export function formatVND(amount: number | undefined) {
  // Chuyển số tiền thành chuỗi
  if (amount === undefined) return 0
  const amountStr = amount.toString()

  // Tạo một mảng để chứa các ký tự
  const result = []

  // Đếm số chữ số đã thêm vào
  let count = 0

  // Duyệt qua chuỗi số tiền theo chiều ngược
  for (let i = amountStr.length - 1; i >= 0; i--) {
    result.push(amountStr[i])
    count++

    // Thêm dấu phẩy sau mỗi 3 chữ số (trừ chữ số cuối cùng)
    if (count % 3 === 0 && count < amountStr.length) {
      result.push(',')
    }
  }

  // Đảo ngược mảng kết quả và nối lại thành một chuỗi
  const formattedAmount = result.reverse().join('') + ' VND'

  return formattedAmount
}
export function getCurrentDay() {
  const ngayHienTai = new Date()

  // Tạo một mảng chứa tên các tháng
  const thang = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Lấy thông tin về ngày, tháng và năm
  const ngay = ngayHienTai.getDate()
  const tenThang = thang[ngayHienTai.getMonth()]
  const nam = ngayHienTai.getFullYear()

  // Định dạng ngày theo yêu cầu
  return tenThang + ' ' + ngay + ', ' + nam
}
export function addCommasToNumber(number: number | undefined) {
  // Chuyển số thành chuỗi
  if (!number) return ''
  const numStr = String(number)

  // Tách phần nguyên và phần thập phân (nếu có)
  const parts = numStr.split('.')
  const integerPart = parts[0]
  const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  // Thêm dấu phẩy vào phần nguyên
  let result = ''
  let count = 0
  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result
    count++
    if (count % 3 === 0 && i > 0) {
      result = ',' + result
    }
  }

  // Kết hợp phần nguyên và phần thập phân
  return result + decimalPart
}
// 09-09-2024
export function convertDayToFormatVN(input: string | undefined) {
  // Phân tách chuỗi input để lấy ngày, tháng, năm
  if (!input) return
  const [day, month, year] = input.split('-').map(Number)

  // Tạo một đối tượng Date mới từ các giá trị đã lấy được
  // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 đến 11, do đó cần trừ tháng đi 1
  const date = new Date(year, month - 1, day)

  // Mảng tên ngày trong tuần bằng tiếng Việt
  const weekDays = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy'
  ]

  // Lấy tên ngày trong tuần từ mảng dựa vào getDay() của đối tượng Date
  const weekDayName = weekDays[date.getDay()]

  // Kết hợp tên ngày trong tuần, ngày và tháng để tạo chuỗi đầu ra
  return `${weekDayName}, ${day} tháng ${month}`
}
// 20:00   180
export const getTimeToShowTime = (time: Value, duration: number) => {
  // Chuyển đổi chuỗi thành đối tượng Date
  if (!time) return ''
  const startTime = new Date() // Tạo đối tượng Date mới
  const timeParts = time.split(':') // Tách chuỗi dựa trên dấu hai chấm
  startTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0) // Đặt giờ, phút, giây, và mili giây

  // Thêm 180 phút
  startTime.setMinutes(startTime.getMinutes() + duration)

  // Định dạng lại thời gian thành chuỗi HH:MM
  return startTime.toTimeString().substring(0, 5)
}
export function compareTime(t1: string, t2: string) {
  // Chuyển đổi chuỗi thành các phần tử giờ và phút
  const [hours1, minutes1] = t1.split(':').map(Number)
  const [hours2, minutes2] = t2.split(':').map(Number)

  // So sánh giờ
  if (hours1 < hours2) return -1 // t1 sớm hơn t2
  if (hours1 > hours2) return 1 // t1 muộn hơn t2

  // Nếu giờ bằng nhau, so sánh phút
  if (minutes1 < minutes2) return -1 // t1 sớm hơn t2
  if (minutes1 > minutes2) return 1 // t1 muộn hơn t2

  return 0 // t1 và t2 bằng nhau
}
export function checkDateAdded(end: Date) {
  // Tạo đối tượng Date từ các ngày nhập vào
  const startDate = new Date()
  // Tính toán sự khác biệt giữa hai ngày theo tháng
  const months =
    (end.getFullYear() - startDate.getFullYear()) * 12 +
    (end.getMonth() - startDate.getMonth())

  // Kiểm tra nếu khoảng thời gian là hơn 2 tháng
  if (months > 2 || (months === 2 && end.getDate() > startDate.getDate())) {
    return true
  } else {
    return false
  }
}
