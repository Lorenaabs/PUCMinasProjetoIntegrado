import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

import { SettingsOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Calendar } from '@/components/Calendar'
import { ResponseError } from '@/errors/response'
import { getCategories, getUser } from '@/services/api'
import { colors } from '@/styles/colors'

export default async function Home() {
  const token = cookies().get('token')?.value

  const userData = getUser(token)
  const categoriesData = getCategories(token)
  const [user, categories] = await Promise.all([userData, categoriesData])

  if (user instanceof ResponseError || categories instanceof ResponseError) {
    return (
      <Typography color="primary" variant="h5">
        Houve um erro ao buscar dados da página
      </Typography>
    )
  }

  const isAdmin = user?.role === 'ADMIN'

  return (
    <Stack gap={2}>
      {isAdmin ? (
        <Stack component="section" gap={2}>
          <Typography variant="body1" color="primary" fontWeight={700}>
            Gerenciamento Sweet&apos;s
          </Typography>
          <Typography variant="caption">
            Funcionalidades em desenvolvimento. Disponível em breve
          </Typography>
          <Stack flexDirection="row" gap={8}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: colors.c7.hex(), fontWeight: 700 }}
            >
              Gerar Relatórios
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: colors.c7.hex(), fontWeight: 700 }}
            >
              Cadastrar Usuário
            </Button>
          </Stack>
        </Stack>
      ) : null}

      <Stack component="section" gap={2}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" color="primary" fontWeight={700}>
            Menu Sweet&apos;s
          </Typography>
          {isAdmin ? (
            <IconButton LinkComponent={Link} href="/categories" size="small">
              <SettingsOutlined sx={{ color: colors.c7.hex() }} />
            </IconButton>
          ) : null}
        </Stack>

        <Stack flexDirection="row" gap={4}>
          {categories.map((category) => (
            <Button
              LinkComponent={Link}
              href={`/categories/${category.id}`}
              key={category.id}
              variant="contained"
              color="secondary"
              sx={{
                color: colors.c7.hex(),
                fontWeight: 700,
                fontSize: '1.2rem',
                paddingTop: '0.8rem',
                maxWidth: '7.2rem',
              }}
            >
              <Stack alignItems="center">
                <Image
                  src={category?.imageUrl || ''}
                  alt={category.name}
                  width={35}
                  height={35}
                />
                {category.name}
              </Stack>
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack component="section" gap={2}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" color="primary" fontWeight={700}>
            Menu Personalizados Sweet&apos;s
          </Typography>
          {isAdmin ? (
            <IconButton size="small">
              <SettingsOutlined sx={{ color: colors.c7.hex() }} />
            </IconButton>
          ) : null}
        </Stack>

        <Typography variant="caption">
          Funcionalidades em desenvolvimento. Disponível em breve
        </Typography>

        <Stack flexDirection="row" gap={8}>
          {[]}
        </Stack>
      </Stack>

      <Stack component="section" gap={2} paddingBottom="10rem">
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" color="primary" fontWeight={700}>
            Calendário de Entregas e Retiradas
          </Typography>
          {isAdmin ? (
            <IconButton size="small">
              <SettingsOutlined sx={{ color: colors.c7.hex() }} />
            </IconButton>
          ) : null}
        </Stack>

        <Typography variant="caption">
          Funcionalidades em desenvolvimento. Disponível em breve
        </Typography>

        <Calendar />
      </Stack>
    </Stack>
  )
}
