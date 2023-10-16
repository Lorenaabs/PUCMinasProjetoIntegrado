import { NextFunction, Request, Response } from 'express'

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = 500

  console.error(error)
  return res.status(statusCode).json({
    message: ['Internal server error, if it persists please contact us.'],
  })
}
