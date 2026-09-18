import axios from 'axios'
export const token = localStorage.getItem('Accesstoken')
export const baseAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user`
})

export const baseShowtimes = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/showtimes`
})

export const InsanceToken = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/user`,

  headers: { Authorization: `Bearer ${token}` }
})
export const InsanceTokenFn = (token:string, endPoint:string) => {
  const accessToken = localStorage.getItem(token)
  const API_URL = `${import.meta.env.VITE_API_URL}/api`
  const InsanceTokenAccess = axios.create({
    baseURL: `${API_URL}/${endPoint}`,

    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return InsanceTokenAccess
}

