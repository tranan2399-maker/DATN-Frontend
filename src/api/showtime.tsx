import axios from 'axios'
import instance from './config'
import { baseShowtimes } from './baseAuth'
export const getOneShowtime = async (id: string) => {
  if (!id) return []
  const result = await instance.get('/showtimes/' + id)
  return result.data.response.docs
}
export const getAllShowTimes = async () => {
  const result = await baseShowtimes.get('/')
  return result
}
export const getApprovalShowTimes = async () => {
  const result = await baseShowtimes.get('/approval')
 
  return result.data.response
}
export const updateApprovalShowTimes = async (id : string) => {
  const result = await baseShowtimes.patch(`/${id}/approval`)
  return result
}

export const CreateShowtimes = async (showtime: any) => {
  const result = await baseShowtimes.post('/', showtime)
  return result
}

export const DeleteShowtimes = async (id: any) => {
  const result = await baseShowtimes.delete(`/${id}`)
  return result
}
export const updateShowtimes = async (showtime: any, id: any) => {
  const result = await baseShowtimes.patch(`/${id}`, showtime)
  return result
}
export const exchangeShowtimes = async (showtime: any, id: any) => {
  const result = await baseShowtimes.patch(`/exchange/${id}`, showtime)
  return result
}

export const DetailShowtimes = async (id: any) => {
  const result = await baseShowtimes.get(`/${id}`)
  return result
}
export const deleteSoft = async (id: any) => {
  const result = await baseShowtimes.patch(`/${id}/soft`)
  return result
}
export const RestoreShowtime = async (id: any) => {
  const result = await baseShowtimes.patch(`/${id}/restore`)
  return result
}
export const getAllSoft = async () => {
  const result = await baseShowtimes.get('/all')
  return result.data.data.docs
}
export const getShowtimesById = async (id: string) => {
  try {
    const response = await axios.get(`/showtimes/${id}`) // Replace with your actual API endpoint for fetching cinema data
    return response.data
  } catch (error) {
    throw new Error('Không thể tìm nạp dữ liệu rạp chiếu phim')
  }
}
