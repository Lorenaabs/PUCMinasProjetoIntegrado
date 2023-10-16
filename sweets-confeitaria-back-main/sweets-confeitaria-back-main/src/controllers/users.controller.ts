import type { NextFunction, Request, Response } from 'express'

import { getToken } from '@auth'
import { ResponseError } from '@errors'
import { statusCodes } from '@utils'

import type { UsersService } from '@services'

export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req
      const user = await this.usersService.login(body)

      if (user instanceof ResponseError || user === null) {
        const response = user?.toJson()
        const statusCode = response?.statusCode || 401
        const message = response?.message
        return res.status(statusCode).json({ message })
      }

      const token = getToken(user.id)

      res.status(statusCodes.OK).json({ token })
    } catch (error) {
      return next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req
      const user = await this.usersService.create(body)

      if (user instanceof ResponseError) {
        const { statusCode, message } = user.toJson()
        return res.status(statusCode).json({ message })
      }

      return res.status(statusCodes.CREATED).json(user)
    } catch(error) {
      return next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.usersService.findAll()

      return res.status(statusCodes.OK).json(users)
    } catch(error) {
      return next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req

      return res.status(statusCodes.OK).json(user)
    } catch(error) {
      return next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id } } = req
      await this.usersService.remove(id)

      return res.status(statusCodes.NO_CONTENT).send()
    } catch(error) {
      return next(error)
    }
  }
}
