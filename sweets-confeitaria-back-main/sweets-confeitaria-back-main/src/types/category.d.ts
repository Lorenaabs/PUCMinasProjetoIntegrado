export interface CreateCategoryDTO {
  name: string
  imageUrl: string
}

export interface Category {
  id: number
  name: string
  products: Products[]
  imageUrl: string
}
