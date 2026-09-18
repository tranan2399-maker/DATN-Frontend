export function convertNumberToAlphabet(num: number) {
  const alphabetArray = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]

  // Kiểm tra nếu num nằm trong khoảng từ 1 đến 26 (số lượng chữ cái trong bảng chữ cái)
  if (num >= 1 && num <= 26) {
    return alphabetArray[num - 1] // Trả về chữ cái tương ứng trong mảng
  } else {
    return num.toString() // Trả về số nếu không nằm trong khoảng từ 1 đến 26
  }
}
export const changeStatusSeat = (status: string) => {
  const objectStatus: { [key: string]: string } = {
    VIP: 'vip',
    available: 'available'
  }
  return objectStatus[status] || objectStatus['available']
}
