import { ResponseError } from '@errors'
import { prisma } from '@models'
import { statusCodes } from '@utils'
import { ProductsValidation } from '@validations'

import type { CreateProductDTO } from '@types'

export class ProductsService extends ProductsValidation {
  constructor(private readonly responseError: typeof ResponseError) {
    super()
  }

  async create(body: CreateProductDTO) {
    if (!this.isCreateDtoValid(body)) {
      const statusCode = statusCodes.BAD_REQUEST
      const message = this.notifications
      this.clearNotifications()

      return new this.responseError(statusCode, message)
    }

    const product = await prisma.products.create({
      data: { ...body }
    })
    return product
  }

  async findAll() {
    return prisma.products.findMany()
  }

  async findOne(id: string) {
    return prisma.products.findUnique({ where: { id } })
  }

  async remove(id: string) {
    prisma.products.delete({ where: { id } })
  }
}
