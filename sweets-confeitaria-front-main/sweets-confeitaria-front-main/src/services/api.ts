import { ResponseError } from '@/errors/response'

const API = process.env.NEXT_PUBLIC_SWEET_API_URL

interface LoginResponse {
  token: string
}

export async function login({
  email,
  password,
}: LoginForm): Promise<LoginResponse | ResponseError> {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  const token = await response.json()

  if (response.ok) {
    return token
  }

  return new ResponseError('Usuário ou senha incorretos. Tente novamente.')
}

export async function getUser(token?: string): Promise<User | ResponseError> {
  const response = await fetch(`${API}/user`, {
    headers: {
      authorization: `${token}`,
    },
  })
  const user = await response.json()

  if (response.ok) {
    return user
  }

  return new ResponseError('Usuário não encontrado')
}

export async function getCategories(
  token?: string,
): Promise<Category[] | ResponseError> {
  const response = await fetch(`${API}/categories`, {
    headers: {
      authorization: `${token}`,
    },
  })
  const categories = await response.json()

  if (response.ok) {
    return categories
  }

  return new ResponseError(categories.message.join('\n'))
}

export async function getCategoryById(
  id: string,
  token?: string,
): Promise<Category | ResponseError> {
  const response = await fetch(`${API}/category/${id}`, {
    headers: {
      authorization: `${token}`,
    },
  })
  const category = await response.json()

  if (response.ok) {
    return category
  }

  return new ResponseError(category.message.join('\n'))
}

export async function createProduct(
  data: CreateProductForm,
  token?: string,
): Promise<CreateProductForm | ResponseError> {
  const formData = new FormData()
  formData.append('categoryId', data.categoryId)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('bakeTime', data.bakeTime)
  formData.append('receiptQuantity', String(data.receiptQuantity))
  formData.append('ingredients', JSON.stringify(data.ingredients))
  formData.append('preparation', data.preparation)
  formData.append('packs', JSON.stringify(data.packs))
  formData.append('receiptCost', String(data.receiptCost))
  formData.append('productValue', String(data.productValue))
  formData.append('image', data.image[0])

  const response = await fetch(`${API}/product`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
    },
    body: formData,
  })
  const product = await response.json()

  if (response.ok) {
    return product
  }

  return new ResponseError(product.message.join('\n'))
}

export async function getProductById(
  id: string,
  token?: string,
): Promise<Product | ResponseError> {
  const response = await fetch(`${API}/product/${id}`, {
    headers: {
      authorization: `${token}`,
    },
  })
  const product = await response.json()

  if (response.ok) {
    return product
  }

  return new ResponseError(product.message.join('\n'))
}

export async function getProducts(
  token?: string,
): Promise<Product[] | ResponseError> {
  const response = await fetch(`${API}/products`, {
    headers: {
      authorization: `${token}`,
    },
  })
  const products = await response.json()

  if (response.ok) {
    return products
  }

  return new ResponseError(products.message.join('\n'))
}
