interface Items {
  name: string
  quantity: number
  type: string
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
  image: FileList
  imageUrl?: string
}
