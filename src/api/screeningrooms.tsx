import { AddandEditRooms, AddandEditRoomsType, Screeningrooms } from '@/Interface/screeningrooms'
import instance from '@/api/config'

export const getAllRooms = async () => {
  const result = await instance.get('/screen/')

  return result.data.datas.docs
}
export const getAllRoomsDestroy = async () => {
  try {
    const result = await instance.get('/screen/destroy')
    console.log(result)
    return result.data.datas.docs
  } catch (error) {
    console.error('Error while performing soft delete:', error)
    throw error
  }
}
export const getOneRooms = async (id: string | undefined) => {
  if(id ===''){
    return []
  }
  const result = await instance.get(`/screen/${id}`)
  return result.data.datas
}

export const HarddeleteRooms = async (id: string) => {
  const result = await instance.delete(`/screen/${id}`)
  return result.data.datas
}
export const SoftDeleteRooms = async (id: string) => {
  try {
    const result = await instance.patch(`/screen/${id}/soft`, {
      data: { destroy: true }
    })
    return result.data.datas
  } catch (error) {
    console.error('Error while performing soft delete:', error)
    throw error
  }
}
export const undoSoftDeleteRooms = async (id: string) => {
  try {
    const result = await instance.patch(`/screen/${id}/restore`, {
      data: { destroy: true }
    })
    return result.data.datas
  } catch (error) {
    throw new Error(error as string)
  }
}
export const newRooms = async (rooms: AddandEditRoomsType) => {
  const response = await instance.post('/screen', rooms)
  return response.data
}

export const editRooms = async (rooms: AddandEditRoomsType, id: string) => {
  const result = await instance.patch(`/screen/${id}`, rooms)
  return result.data.datas
}
// admin tableRoomsDetail and filter select
export const getShows = async () => {
  const response = await instance.get('/showtimes')
  return response.data.response.docs
}

export const getShowsByRoom = async (id: string) => {
  // Đây là cách chính xác để gửi ScreeningRoomId như một query parameter
  const result = await instance.get(`/showtimes?screenRoomId=${id}`)
  return result.data.response.docs
}

export const getAllRoomAdmin = async (params: { id?: any; _showId?: any }) => {
  // Đảm bảo thêm tham số `destroy=false` vào params trước khi tạo query string
  const paramsWithDestroy = { ...params }
  const queryString = new URLSearchParams(paramsWithDestroy as any).toString()
  const result = await instance.get(`/screen?${queryString}`)
  return result.data.datas.docs
}
