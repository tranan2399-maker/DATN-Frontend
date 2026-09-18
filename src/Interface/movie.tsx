/* eslint-disable no-unused-vars */
interface CategoryId {
  _id?: string
  name?: string
}
export interface MovieType {
  map(
    arg0: (
      movie: MovieType,
      // eslint-disable-next-line no-unused-vars
      index: number
    ) => import('react/jsx-runtime').JSX.Element
  ): unknown
  _id: string
  name: string
  author: string
  actor: string
  image: string
  duration: number
  country: string
  age_limit: number
  language: string
  fromDate: string
  toDate: string
  trailer: string
  desc: string
  status: string
  rate: number
  slug: string
  destroy: boolean
  categoryId?: CategoryId[]
  prices?: string[]
  showTimes?: string[]
  createdAt: string
  updatedAt: string
}
