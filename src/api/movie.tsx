import { FormMovieAdd } from '@/admin/types/movie'
import instance from './config'

export interface QueryMovie {
  status: string
  order: string
  country: string
  rate: string
  age: string
}

export const getOneMovie = async (id: string) => {
  const result = await instance.get('/movie/' + id)
  return result.data.data
}
export const getAllMovieHome = async () => {
  const result = await instance.get('/movie/home')
  return result.data.data.docs
}
export const getMovieStatus = async (query: QueryMovie) => {
  let result
  if (query.status == '') {
    result = await instance.get(
      `/movie/sta?_order=${query.order}&_country=${query.country}&_rate=${query.rate}&_age=${query.age}`
    )
    return result.data.data.docs
  } else {
    result = await instance.get(
      `/movie/sta?status=${query.status}&_order=${query.order}&_country=${query.country}&_rate=${query.rate}&_age=${query.age}`
    )
    return result.data.data.docs
  }
}
// export const getAllMovie = async () => {
//   const result = await instance.get('/movie')
//   return result.data.data.docs
// }
export const getAllHasShow = async (_cate: string) => {
  const result = await instance.get('/movie/showtime?_cate=' + _cate)
  return result.data.data.docs
}
export const searchMovie = async (search: string) => {
  try {
    const result = await instance.get('/movie/search?q=' + search)
    return result.data.data.docs
  } catch (error) {
    return error
  }
}
export const getRelateMovie = async (id: string) => {
  const result = await instance.get('/movie/movieByCate/' + id)
  return result.data.data
}

// admin
// get all m
export const getAllMovie = async () => {
  const result = await instance.get('/movie')
  return result.data.data.docs
}
export const getAllScreenRoom = async () => {
  const result = await instance.get('/screen')
  return result.data.datas.docs
}
export const getOneScreenRoom = async (id:any) => {
  const result = await instance.get(`/screen/${id}` )
  return result
}

export const getCountMovie = async () => {
  const result = await instance.get('/movie/count')
  return result.data.data
}

//remove Movie
export const removeMovie = async (id: string) => {
  const result = await instance.delete(`/movie/${id}`)
  return result.data
}

//add Movie
export const addMovie = async (Movie: FormMovieAdd) => {
  const result = await instance.post('/movie', Movie)
  return result.data
}

//edit cinema
export const editMovie = async (cinema: FormMovieAdd, id: string) => {
  const result = await instance.patch(`/movie/${id}`, cinema)
  return result.data
}
// update price movie
//edit cinema
export const editMoviePice = async (cinema : any , id: any) => {
  const result = await instance.patch(`/movies/price/${id}`, cinema)
  return result.data
}
//  get soft deleta
export const getAllsoftDelete = async () => {
  const result = await instance.get('/movie/softdelete')
  return result.data.data.docs
}
//   soft deleta
export const softDeleteMovie = async (id: string) => {
  const result = await instance.patch(`/movie/softdelete/${id}`)
  return result.data.data.docs
}
//   srestore movie
export const restoreMovie = async (id: string) => {
  const result = await instance.patch(`/movie/restore/${id}`)
  return result.data
}