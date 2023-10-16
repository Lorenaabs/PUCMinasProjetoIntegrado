import { cookies } from 'next/headers'

export async function POST() {
  cookies().delete('token')
  return new Response(null, { status: 204 })
}
