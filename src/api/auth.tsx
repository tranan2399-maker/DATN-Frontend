import { FormValues } from '@/pages/modals/LoginModal'
import { InsanceToken, InsanceTokenFn, baseAuth } from './baseAuth'

export const signup = (user: any) => {
  return baseAuth.post('/register', user)
}
export const signin = (user: any) => {
  return baseAuth.post('/login', user)
}
export const getCountUser = () => {
  return baseAuth.get('/count')
}
export const signinWithGoogle = (user: FormValues) => {
  return baseAuth.post('/googleSign', user)
}
export const getUser = () => {
  return baseAuth.get('/')
}

export const updateUser = (user: any) => {
  return InsanceToken.patch('/updateUser', user)
}
export const updateClient = (user: any) => {
  if (!user) return {}
  return InsanceToken.patch('/updateClient', user)
}
export const updateUserId = (user:any, id :any ) => {
  return InsanceToken.put(`/${id}`, user)
}
export const block = (user:any, id :any ) => {
  return InsanceToken.patch(`/block/${id}`, user)
}
export const unblock = (user:any, id :any ) => {
  return InsanceToken.patch(`/unBlock/${id}`, user)
}
export const deleteUser = (id: string | number) => {
  return InsanceToken.delete(`/${id}`)
}

export const forgotPassword = (email: string) => {
  return InsanceToken.post('/forgotPassword', email)
}

export const resetPassword = (user: any) => {
  return baseAuth.put('/resetPassword', user)
}

export const getDetailUser = () => {
  return InsanceToken.get('/userDetail')
}
export const getDetailUserClient = () => {
  const instanceToken = InsanceTokenFn('Accesstoken', 'user')
  return instanceToken.get('/userDetail')
}
