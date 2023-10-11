import { cookies } from 'next/headers'
import Link from 'next/link'

import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AddButton } from '@/components/AddButton'
import { EmptyList } from '@/components/EmptyList'
import { SearchBar } from '@/components/SearchBar'
import { SweetItem } from '@/components/SweetItem'
import { ResponseError } from '@/errors/response'
import { getCategoryById } from '@/services/api'

export default async function Category({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const token = cookies().get('token')?.value
  const category = await getCategoryById(+categoryId, token)

  if (category instanceof ResponseError) {
    return (
      <Typography color="primary" variant="h5">
        Categoria não encontrada
      </Typography>
    )
  }

  const { name, products } = category
  const hasProducts = products.length > 0
  const firstEmptyText = 'Você não possui produtos associados no momento.'
  const secondEmptyText = 'Adicione um produto para associar à categoria.'

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
      <SearchBar />
      <Stack paddingBottom="10rem">
        {!hasProducts ? (
          <EmptyList firstText={firstEmptyText} secondText={secondEmptyText} />
        ) : (
          <List>
            {products.map((product) => (
              <SweetItem
                key={product.id}
                href={`/products/${product.id}`}
                {...product}
              />
            ))}
          </List>
        )}

        <AddButton
          LinkComponent={Link}
          href={`/categories/${categoryId}/new-product`}
        />
      </Stack>
    </Stack>
  )
}
