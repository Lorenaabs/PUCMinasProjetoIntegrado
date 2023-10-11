import { cookies } from 'next/headers'

import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { EmptyList } from '@/components/EmptyList'
import { SearchBar } from '@/components/SearchBar'
import { SweetItem } from '@/components/SweetItem'
import { ResponseError } from '@/errors/response'
import { getCategories } from '@/services/api'

export default async function Categories() {
  const token = cookies().get('token')?.value
  const categories = await getCategories(token)

  if (categories instanceof ResponseError) {
    return (
      <Typography color="primary" variant="h5">
        Houve um erro ao buscar todas as categorias!
      </Typography>
    )
  }

  const hasCategories = categories.length > 0
  const firstEmptyText = 'Você não possui categorias cadastradas no momento.'
  const secondEmptyText = 'Adicione uma categoria.'

  return (
    <Stack gap={4}>
      <Typography
        textAlign="center"
        variant="body1"
        color="primary"
        fontWeight={700}
      >
        MENU SWEET&apos;S
      </Typography>
      <SearchBar />
      <Stack paddingBottom="10rem">
        {!hasCategories ? (
          <EmptyList firstText={firstEmptyText} secondText={secondEmptyText} />
        ) : (
          <List>
            {categories.map((category) => (
              <SweetItem
                key={category.id}
                href={`/categories/${category.id}`}
                {...category}
              />
            ))}
          </List>
        )}
      </Stack>
    </Stack>
  )
}
