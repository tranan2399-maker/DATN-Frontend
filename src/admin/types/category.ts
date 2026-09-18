export interface Category {
  _id: string
  name: string
  isDeleteable: boolean
  products: string[]
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface FormCategoryAdd {
  name: string
}
