import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'
import HelpOutline from '@mui/icons-material/HelpOutlined'
import HomeOutlined from '@mui/icons-material/HomeOutlined'
import PersonOutlined from '@mui/icons-material/PersonOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import Avatar from '@mui/material/Avatar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { HeaderMenu } from '@/components/HeaderMenu'
import { ResponseError } from '@/errors/response'
import { getUser } from '@/services/api'
import { colors } from '@/styles/colors'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/login')
  }

  const user = await getUser(token)

  if (user instanceof ResponseError) {
    redirect('/login')
  }

  const [firstName, secondName] = user?.name.split(' ')

  return (
    <Stack
      component="main"
      sx={{
        padding: 0,
        height: '100%',
        backgroundColor: 'primary.main',
      }}
    >
      <Stack
        component="header"
        flexDirection="row"
        padding="3.2rem 3.0rem 1rem"
        justifyContent="space-between"
      >
        <Stack alignItems="center" gap={3} flexDirection="row">
          <Avatar
            sx={{
              height: 70,
              width: 70,
              border: `0.5rem solid ${colors.c1.hex()}`,
            }}
          >
            {firstName[0]}
            {secondName ? secondName[0] : null}
          </Avatar>
          <Box>
            <Typography variant="body1" color="primary.contrastText">
              {user?.name}
            </Typography>
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{
                color: colors.c7.hex(),
                textDecoration: 'underline',
                textUnderlineOffset: 4,
                textDecorationColor: colors.c2.hex(),
              }}
            >
              Rua Menezes de Sá, n&#176;53
            </Typography>
          </Box>
        </Stack>

        <Stack flexDirection="row" alignItems="flex-start">
          <IconButton size="small">
            <Tooltip title="Ajuda - Não implementado" placement="top">
              <HelpOutline color="tertiary" />
            </Tooltip>
          </IconButton>
          <HeaderMenu />
        </Stack>
      </Stack>

      <Box
        component="section"
        sx={{
          backgroundColor: 'tertiary.main',
          px: '2.8rem',
          paddingTop: '2.4rem',
          borderTopLeftRadius: '3.2rem',
          borderTopRightRadius: '3.2rem',
          height: '100%',
        }}
      >
        {children}
      </Box>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: '4rem 4rem 0 0',
          zIndex: 'tooltip',
        }}
        elevation={4}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            LinkComponent={Link}
            href="/home"
            label="Início"
            icon={<HomeOutlined />}
            sx={{ borderTopLeftRadius: 40 }}
          />
          <BottomNavigationAction
            LinkComponent={Link}
            href="/search"
            label="Buscar"
            icon={<SearchOutlined />}
          />
          <BottomNavigationAction
            LinkComponent={Link}
            href="/budget"
            label="Orçamentos"
            icon={<DescriptionOutlined />}
          />
          <BottomNavigationAction
            LinkComponent={Link}
            href="/profile"
            label="Perfil"
            icon={<PersonOutlined />}
            sx={{ borderTopRightRadius: 40 }}
          />
        </BottomNavigation>
      </Paper>
    </Stack>
  )
}
