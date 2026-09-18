export interface Food {
    _id?: string
    name?: string
    price?: number
    image?: string
    isDeleted?: boolean
}

export interface FormFoodAdd {
    name: string
    price: number
    image?: string
}
