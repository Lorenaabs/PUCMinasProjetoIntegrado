import { Prisma } from '@prisma/client'

export interface CreateProductDTO {
  name: string
  description: string
  bakeTime: number
  receiptQuantity: number
  ingredients: Prisma.JsonObject
  preparation: string
  packs: Prisma.JsonObject
  receiptCost: number
  productValue: number
  imageUrl: string
  categoryId: string
}

export interface Items {
  name: string
  quantity: number
  type: string
}

export interface Product {
  id: string
  name: string
  description: string
  bakeTime: number
  receiptQuantity: number
  ingredients: Items[]
  preparation: string
  packs: Items[]
  receiptCost: number
  productValue: number
  image: FileList
  imageUrl: string
}
