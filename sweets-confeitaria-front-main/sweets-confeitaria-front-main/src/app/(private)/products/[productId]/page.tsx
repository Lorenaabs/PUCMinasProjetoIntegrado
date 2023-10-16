import { cookies } from 'next/headers'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AddButton } from '@/components/AddButton'
import { ResponseError } from '@/errors/response'
import { getProductById } from '@/services/api'

export default async function Categories({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = params
  const token = cookies().get('token')?.value
  const product = await getProductById(productId, token)

  if (product instanceof ResponseError) {
    return (
      <Typography color="primary" variant="h5">
        Produto não encontrado
      </Typography>
    )
  }

  const { name } = product

  return (
    <Stack gap={4}>
      <Typography
        sx={{ textTransform: 'uppercase' }}
        textAlign="center"
        variant="body1"
        color="primary"
        fontWeight={700}
      >
        {name}
      </Typography>
      <Stack>
        <AddButton />
      </Stack>
    </Stack>
  )
}
