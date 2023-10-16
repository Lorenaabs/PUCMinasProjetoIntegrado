import type { NextFunction, Request, Response } from 'express'

import { ResponseError } from '@errors'
import { statusCodes } from '@utils'

import type { ProductsService } from '@services'

export class ProductsController {
  constructor (private readonly productsService: ProductsService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, file } = req
      const isDev = process.env.NODE_ENV === 'DEVELOPMENT'
      const devProxy = isDev ? `:${process.env.PORT}` : ''
      const mainUrl = `${process.env.BACKEND_URL}`
      const imageUrl = `${mainUrl}${devProxy}/public/${file?.filename}`
      const product = await this.productsService.create({
        ...body,
        imageUrl,
        bakeTime: +body.bakeTime,
        receiptQuantity: +body.receiptQuantity,
        receiptCost: +body.receiptCost,
        productValue: +body.productValue
      })

      if (product instanceof ResponseError) {
        const { statusCode, message } = product.toJson()
        return res.status(statusCode).json({ message })
      }

      return res.status(statusCodes.CREATED).json(product)
    } catch (error) {
      return next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productsService.findAll()

      return res.status(statusCodes.OK).json(products)
    } catch (error) {
      return next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id } } = req
      const product = await this.productsService.findOne(id)

      return res.status(statusCodes.OK).json(product)
    } catch (error) {
      return next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { params: { id } } = req
      await this.productsService.remove(id)

      return res.status(statusCodes.NO_CONTENT).send()
    } catch (error) {
      return next(error)
    }
  }
}
