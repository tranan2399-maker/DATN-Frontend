import { Seat } from '@/admin/types/seat'
import instance from './config'

export const getOneSeat = async (id: string) => {
  const result = await instance.get('/seat/' + id)
  return result.data.data
}

export const getAllSeat = async (id: { _hallId: string; _showId: string }) => {
  const result = await instance.get(
    `/seat?_hallId=${id._hallId}&_showId=${id._showId}`
  )
  return result.data.datas.docs
}
export const getlSeatByShow = async (id: { _hallId: string; _showId: string }) => {
  const result = await instance.get(
    `/seat/show?_hallId=${id._hallId}&_showId=${id._showId}`
  )
  return result.data.datas.docs
}

//admin
export const getAllSeatAdmin = async (params: {
  _hallId?: any
  _showId?: any
  destroy?: string
}) => {
  // Đảm bảo thêm tham số `destroy=false` vào params trước khi tạo query string
  const paramsWithDestroy = { ...params, destroy: 'false' }
  const queryString = new URLSearchParams(paramsWithDestroy as any).toString()
  const result = await instance.get(`/seat/all?${queryString}`)
  return result.data.datas.docs
}

export const getOneSeatAdmin = async (id: string) => {
  const result = await instance.get('/seat/' + id)
  return result.data.datas
}

export const getHalls = async () => {
  const result = await instance.get('/screen')
  return result.data.datas.docs
}

export const getShows = async () => {
  const response = await instance.get('/showtimes')
  return response.data.response.docs
}

export const getShowsByHall = async (hallId: string) => {
  // Đây là cách chính xác để gửi ScreeningRoomId như một query parameter
  const result = await instance.get(`/showtimes?screenRoomId=${hallId}`)
  return result.data.response.docs
}

export const addSeat = async (seat: Seat) => {
  const result = await instance.post('/seat', seat)
  return result.data
}

export const removeSeat = async (id: string) => {
  const result = await instance.delete(`/seat/${id}`)
  return result.data
}

export const editSeat = async (seat: Seat, id: string) => {
  const result = await instance.patch(`/seat/${id}`, seat)
  return result.data
}
