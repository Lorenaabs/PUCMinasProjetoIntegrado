import { cookies } from 'next/headers'
import Link from 'next/link'

import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AddButton } from '@/components/AddButton'
import { EmptyList } from '@/components/EmptyList'
import { ProductCard } from '@/components/ProductCard'
import { SearchBar } from '@/components/SearchBar'
import { SweetItem } from '@/components/SweetItem'
import { ResponseError } from '@/errors/response'
import { getCategoryById, getUser } from '@/services/api'

export default async function Category({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const token = cookies().get('token')?.value
  const userData = getUser(token)
  const categoryData = getCategoryById(categoryId, token)

  const [user, category] = await Promise.all([userData, categoryData])

  if (user instanceof ResponseError || category instanceof ResponseError) {
    return (
      <Typography color="primary" variant="h5">
        Categoria não encontrada
      </Typography>
    )
  }

  const { name, products } = category
  const hasProducts = products.length > 0
  const isAdmin = user.role === 'ADMIN'

  const firstEmptyText = isAdmin
    ? 'Você não possui produtos associados no momento.'
    : 'Não há produtos no momento'
  const secondEmptyText = isAdmin
    ? 'Adicione um produto para associar à categoria.'
    : null

  const ComponentItem = isAdmin ? SweetItem : ProductCard

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
      {isAdmin ? <SearchBar /> : null}
      <Stack paddingBottom="10rem">
        {!hasProducts ? (
          <EmptyList firstText={firstEmptyText} secondText={secondEmptyText} />
        ) : (
          <List>
            {products.map((product) => (
              <ComponentItem
                key={product.id}
                href={`/products/${product.id}`}
                {...product}
              />
            ))}
          </List>
        )}

        {isAdmin ? (
          <AddButton
            LinkComponent={Link}
            href={`/categories/${categoryId}/new-product`}
          />
        ) : null}
      </Stack>
    </Stack>
  )
}
