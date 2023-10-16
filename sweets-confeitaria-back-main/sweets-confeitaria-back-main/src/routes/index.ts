import { Router } from 'express'

import { authMiddleware } from '@auth'
import { categoriesRouter } from './categories.route'
import { productsRouter } from './products.route'
import { usersPrivateRouter, usersPublicRouter } from './users.route'

export const router = Router()

router.use(usersPublicRouter)

router.use(authMiddleware)
router.use(usersPrivateRouter)
router.use(categoriesRouter)
router.use(productsRouter)
