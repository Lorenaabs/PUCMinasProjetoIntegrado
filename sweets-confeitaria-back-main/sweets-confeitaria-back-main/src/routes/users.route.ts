import { Router } from 'express'

import { UsersController } from '@controllers'
import { ResponseError } from '@errors'
import { UsersService } from '@services'

export const usersPrivateRouter = Router()
export const usersPublicRouter = Router()

const usersController = new UsersController(new UsersService(ResponseError))

usersPublicRouter.post('/login', usersController.login.bind(usersController))
usersPublicRouter.post('/user', usersController.create.bind(usersController))

usersPrivateRouter.get('/users', usersController.findAll.bind(usersController))
usersPrivateRouter.get('/user', usersController.findOne.bind(usersController))
usersPrivateRouter.delete('/user/:id', usersController.remove.bind(usersController))
