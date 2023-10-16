import { cookies } from 'next/headers'

import { ResponseError } from '@/errors/response'
import { login } from '@/services/api'
import { statusCodes } from '@/utils/httpStatusCode'

export async function POST(request: Request) {
  const body = await request.json()
  const response = await login(body)

  if (response instanceof ResponseError) {
    throw response
  }
  const { token } = response

  if (token) {
    cookies().set('token', token)
    return new Response(null, { status: statusCodes.OK })
  }

  return new Response(null, { status: statusCodes.UNAUTHORIZED })
}
