import instance from './config'
export interface CommentService {
  _id?: string
  movieId?: string
  like?: string[]
  userId?: string
  empty?: boolean
  content?: string
  parentId?: string
}
export const getCommentByMovie = async (id: string) => {
  const result = await instance.get('/comment/recursive/' + id)
  return result.data.datas
}
export const getCommentByMovieAdmin = async (id: string) => {
  const result = await instance.get('/comment/movie?_movieId=' + id)
  return result.data.datas
}
export const postCommentByMovie = async (data: CommentService) => {
  const result = await instance.post('/comment', data)
  return result.data.datas
}
export const replyCommentByMovie = async (data: CommentService) => {
  const result = await instance.post('/comment/reply', data)
  return result.data.datas
}
export const likeComment = async (data: CommentService) => {
  const result = await instance.patch(`/comment/like/${data._id}`, data)
  return result.data.datas
}
export const deleteComment = async (data: CommentService) => {
  const result = await instance.delete(`/comment/${data._id}`)
  return result.data.datas
}
export const deleteSubComment = async (id: string) => {
  const result = await instance.delete(`/comment/sub/${id}`)
  return result.data.datas
}
