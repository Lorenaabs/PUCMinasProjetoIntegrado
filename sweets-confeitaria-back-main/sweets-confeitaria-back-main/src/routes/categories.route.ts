import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@configs'
import { CategoriesController } from '@controllers'
import { ResponseError } from '@errors'
import { CategoriesService } from '@services'

export const categoriesRouter = Router()
const upload = multer(uploadConfig)
const categoriesController = new CategoriesController(new CategoriesService(ResponseError))

categoriesRouter.get('/categories', categoriesController.findAll.bind(categoriesController))
categoriesRouter.get('/category/:id', categoriesController.findOne.bind(categoriesController))
categoriesRouter.post('/category', upload.single('image'), categoriesController.create.bind(categoriesController))
categoriesRouter.delete('/category/:id', categoriesController.remove.bind(categoriesController))

