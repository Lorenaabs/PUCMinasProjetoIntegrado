import type { NextFunction, Request, Response } from 'express'

import { ResponseError } from '@errors'
import { statusCodes } from '@utils'

import type { CategoriesService } from '@services'

export class CategoriesController {
  constructor (private readonly categoriesService: CategoriesService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, file } = req
      const isDev = process.env.NODE_ENV === 'DEVELOPMENT'
      const devProxy = isDev ? `:${process.env.PORT}` : ''
      const mainUrl = `${process.env.BACKEND_URL}`
      const imageUrl = `${mainUrl}${devProxy}/public/${file?.filename}`
      const category = await this.categoriesService.create({ ...body, imageUrl })

      if (category instanceof ResponseError) {
        const { statusCode, message } = category.toJson()
        return res.status(statusCode).json({
          message,
        })
      }

      return res.status(statusCodes.CREATED).json(category)
    } catch (error) {
      console.log({ error })
      return next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoriesService.findAll()

      return res.status(statusCodes.OK).json(categories)
    } catch (error) {
      return next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id } } = req
      const category = await this.categoriesService.findOne(id)

      return res.status(statusCodes.OK).json(category)
    } catch (error) {
      return next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id } } = req
      await this.categoriesService.remove(id)

      return res.status(statusCodes.NO_CONTENT).send()
    } catch (error) {
      return next(error)
    }
  }
}
