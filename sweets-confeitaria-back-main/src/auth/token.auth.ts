import jwt from 'jsonwebtoken'

import { ResponseError } from '@errors'
import { statusCodes } from '@utils'

const { JWT_SECRET } = process.env

export function getToken(userId: string): string | ResponseError {
  if (JWT_SECRET) {
    const token = jwt.sign({ data: { userId } }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '24h' })
    return token
  }

  throw new Error('JWT_SECRET was not defined!')
}

export function verifyToken(token: string | undefined) {
  if (!token || !JWT_SECRET) {
    return new ResponseError(statusCodes.UNAUTHORIZED, ['Token not found'])
  }

  const user = jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error) {
      return new ResponseError(statusCodes.UNAUTHORIZED, ['Invalid token'])
    }

    if (typeof data === 'string' || !data) return data

    const { data: { userId } } = data

    return userId
  }) as unknown

  return user as string | ResponseError
}
