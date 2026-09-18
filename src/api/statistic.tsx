import instance from './config'

export const getProfitAndRevenue = async () => {
  const result = await instance.get('/statistic/profit')
  return result.data
}
export const getTopMovie = async () => {
  try {
    const result = await instance.get('/statistic/topmovie')
    return result.data.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getTopUser = async () => {
  try {
    const result = await instance.get('/statistic/topuser')
    return result.data.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getTopFood = async () => {
  try {
    const result = await instance.get('/statistic/topfood')
    return result.data.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getSexUser = async () => {
  try {
    const result = await instance.get('/statistic/sex')
    return result.data.sex
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getCountCate = async () => {
  try {
    const result = await instance.get('/statistic/countCate')
    return result.data.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getCountTicketAfterWeek = async () => {
  try {
    const result = await instance.get('/statistic/countTicket')
    return result.data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getAgeUser = async () => {
  try {
    const result = await instance.get('/statistic/age')

    return result.data.age
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getChartRevenueWeek = async () => {
  try {
    const result = await instance.get('/statistic/revenueWeek')

    return result.data
  } catch (error) {
    throw new Error(error as string)
  }
}
