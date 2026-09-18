import { Category, FormCategoryAdd } from '@/admin/types/category'
import instance from './config'

export const getAllCategory = async () => {
  const result = await instance.get('/category')
  return result.data.data
}
export const getMovieByCategory = async (categoryId: string) => {
  const result = await instance.get('/category/query?id=' + categoryId)
  return result.data.data as Category[]
}

//get detail category
export const getCategoryById = async (id: string) => {
  const result = await instance.get('/category/query?id=' + id)
  return result.data.data[0] as Category
}

// admin

//remove category
export const removeCategory = async (id: string) => {
  const result = await instance.delete(`/category/${id}`)
  return result.data
}

//add category
export const addCategory = async (category: FormCategoryAdd) => {
  const result = await instance.post('/category', category)
  return result.data
}

//edit category
export const editCategory = async (category: FormCategoryAdd, id: string) => {
  const result = await instance.patch(`/category/${id}`, category)
  return result.data
}
