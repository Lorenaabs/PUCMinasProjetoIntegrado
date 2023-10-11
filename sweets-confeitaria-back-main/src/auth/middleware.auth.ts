import { NextFunction, Request, Response } from 'express'

import { ResponseError } from '@errors'
import { prisma } from '@models'
import { verifyToken } from './token.auth'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers
    const userId = verifyToken(authorization)

    if (userId instanceof ResponseError) {
      const { statusCode, message } = userId.toJson()

      return res.status(statusCode).json({ message })
    }
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        role: true
      }
    })

    if (user) {
      req.user = user
      return next()
    }
  } catch (error) {
    return next(error)
  }
}
