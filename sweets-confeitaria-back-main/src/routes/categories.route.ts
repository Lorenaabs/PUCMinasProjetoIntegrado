import { Router } from 'express'

import { CategoriesController } from '@controllers'
import { ResponseError } from '@errors'
import { CategoriesService } from '@services'

export const categoriesRouter = Router()
const categoriesController = new CategoriesController(new CategoriesService(ResponseError))

categoriesRouter.get('/categories', categoriesController.findAll.bind(categoriesController))
categoriesRouter.post('/category', categoriesController.create.bind(categoriesController))
categoriesRouter.post('/category/:id', categoriesController.findOne.bind(categoriesController))
categoriesRouter.delete('/category/:id', categoriesController.remove.bind(categoriesController))

