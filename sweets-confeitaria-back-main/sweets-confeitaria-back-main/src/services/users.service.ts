import { ResponseError } from '@errors'
import { prisma } from '@models'
import { statusCodes } from '@utils'
import { UsersValidation } from '@validations'

import { getPasswordHash } from '@auth'
import type { CreateUserDTO, UserLoginDTO } from '@types'

export class UsersService extends UsersValidation {
  constructor(private readonly responseError: typeof ResponseError) {
    super()
  }

  async login(body: UserLoginDTO) {
    if (!this.isLoginValid(body)) {
      const statusCode = statusCodes.UNAUTHORIZED
      const message = this.notifications

      return new this.responseError(statusCode, message)
    }

    const user = prisma.users.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    })

    return user
  }

  async create(body: CreateUserDTO) {
    if (!this.isCreateDtoValid(body)) {
      const statusCode = statusCodes.BAD_REQUEST
      const message = this.notifications

      return new this.responseError(statusCode, message)
    }

    const user = await prisma.users.create({
      data: { ...body, password: await getPasswordHash(body.password) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return user
  }

  async findAll() {
    return prisma.users.findMany()
  }

  async findOne(id: string) {
    return prisma.users.findUnique({ where: { id } })
  }

  async remove(id: string) {
    prisma.users.delete({ where: { id } })
  }
}
