import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@configs'
import { ProductsController } from '@controllers'
import { ResponseError } from '@errors'
import { ProductsService } from '@services'

export const productsRouter = Router()
const upload = multer(uploadConfig)
const productsController = new ProductsController(new ProductsService(ResponseError))

productsRouter.get('/products', productsController.findAll.bind(productsController))
productsRouter.get('/product/:id', productsController.findOne.bind(productsController))
productsRouter.post('/product', upload.single('image'), productsController.create.bind(productsController))
productsRouter.delete('/product/:id', productsController.remove.bind(productsController))
