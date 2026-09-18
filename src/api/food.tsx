import instance from './config'
import { Food } from '@/admin/types/food'
// export const getAllFood = async () => {
//   const result = await instance.get('/food')
//   return result.data.datas.docs
// }
export const getAllFood = async () => {
  const result = await instance.get('/food')
  return result.data.datas
}

export const getFoodById = async (id: string) => {
  const result = await instance.get('/food/' + id)
  return result.data.datas as Food
}


//admin

export const getAllFoodDestroy = async () => {
  const result = await instance.get('/food/destroy')
  return result.data.datas
}
export const addFood = async (food: Food) => {
  const result = await instance.post('/food', food)
  return result.data
}
export const editFood = async (food: Food, id: string) => {
  const result = await instance.patch(`/food/${id}`, food)
  return result.data
}
//cập nhật đồ ăn đã xóa mềm
export const restoreFood = async (id: string) => {
  // Tạo một đối tượng để cập nhật trường isDeleted
  const updateData = {
    isDeleted: false
  }
  // Gửi yêu cầu PATCH địa tượng food
  const result = await instance.patch(`/food/${id}/restore`, updateData)
  return result.data
}



//xóa mềm
export const softDeleteFood = async (id: string) => {
  // Tạo một đối tượng để cập nhật trường isDeleted
  const updateData = {
    isDeleted: true
  }
  // Gửi yêu cầu PATCH địa tượng food
  const result = await instance.patch(`/food/${id}`, updateData)
  return result.data
}
//xóa cứng
export const removeFood = async (id: string) => {
  const result = await instance.delete(`/food/destroy/${id}`)
  return result.data
}


