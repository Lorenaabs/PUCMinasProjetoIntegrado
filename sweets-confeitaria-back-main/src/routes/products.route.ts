import { Router } from 'express'

import { ProductsController } from '@controllers'
import { ResponseError } from '@errors'
import { ProductsService } from '@services'

export const productsRouter = Router()
const productsController = new ProductsController(new ProductsService(ResponseError))

productsRouter.get('/products', productsController.findAll.bind(productsController))
productsRouter.post('/product', productsController.create.bind(productsController))
productsRouter.post('/product/:id', productsController.findOne.bind(productsController))
productsRouter.delete('/product/:id', productsController.remove.bind(productsController))
