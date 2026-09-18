
// import { , FormCinemaAdd } from '@/admin/types/cinema'

import { Cinema, FormCinemaAdd } from '@/admin/types/cenima'
import instance from './config'

//get detail cinema
export const getCinemaById = async (id: string) => {
  const result = await instance.get('/cinema/query?id=' + id)
  return result.data.data[0] as Cinema
}
//get detail cinema 2
export const getOneCinema = async (id: string) => {
  const result = await instance.get('/cinema/' + id)
  return result.data.data
}
// admin
export const getAllCinema = async () => {
  const result = await instance.get('/cinema')
  return result.data.data.docs
}
//remove cinema
export const removeCinema = async (id: string) => {
  const result = await instance.delete(`/cinema/${id}`)
  return result.data
}

//add cinema
export const addCinema = async (cinema: FormCinemaAdd) => {
  const result = await instance.post('/cinema', cinema)
  return result.data
}

//edit cinema
export const editCinema = async (cinema: FormCinemaAdd, id: string) => {
  const result = await instance.patch(`/cinema/${id}`, cinema)
  
  return result.data
}
