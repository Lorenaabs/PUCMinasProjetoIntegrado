import { ResponseError } from '@errors'
import { prisma } from '@models'
import { statusCodes } from '@utils'
import { CategoriesValidation } from '@validations'

import type { CreateCategoryDTO } from '@types'

export class CategoriesService extends CategoriesValidation {
  constructor(private readonly responseError: typeof ResponseError) {
    super()
  }

  async create(body: CreateCategoryDTO) {
    if (!this.isCreateDtoValid(body)) {
      const statusCode = statusCodes.BAD_REQUEST
      const message = this.notifications
      this.clearNotifications()

      return new this.responseError(statusCode, message)
    }

    const category = await prisma.categories.create({
      data: { ...body }
    })
    return category
  }

  async findAll() {
    return prisma.categories.findMany()
  }

  async findOne(id: string) {
    return prisma.categories.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        products: true,
      }
    })
  }

  async remove(id: string) {
    prisma.categories.delete({ where: { id } })
  }
}
