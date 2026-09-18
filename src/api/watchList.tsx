import instance from './config'

export const getWatchListByUser = async (id: string) => {
  if (!id) return []
  const result = await instance.get('/watchlist/' + id)
  return result.data.data.docs
}
export const addWatchList = async (data: {
  userId: string
  movieId: string
}) => {
  const result = await instance.post('/watchlist', data)
  return result.data.data.docs
}
export const deleteWatchList = async (id: string) => {
  await instance.delete('/watchlist/' + id)
}
