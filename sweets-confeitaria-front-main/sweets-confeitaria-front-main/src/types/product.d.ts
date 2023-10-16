interface Items {
  name: string
  quantity: number
  type: string
}

interface CreateProductForm {
  categoryId: string
  name: string
  description: string
  bakeTime: string
  receiptQuantity: number
  ingredientName: string
  ingredientQuantity: number
  ingredientType: string
  ingredients: Items[]
  preparation: string
  packName: string
  packQuantity: number
  packType: string
  packs: Items[]
  receiptCost: number
  productValue: number
  image: FileList
}

interface Product {
  id: number
  name: string
  description: string
  bakeTime: string
  receiptQuantity: number
  ingredients: Items[]
  preparation: string
  packs: Items[]
  receiptCost: number
  productValue: number
  imageUrl: string
}
