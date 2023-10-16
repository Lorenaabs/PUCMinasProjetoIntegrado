'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ArrowBack from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { parseCookies } from 'nookies'

import sweetIcon from '@root/public/icons/android-chrome-256x256.png'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  const [clientHeight, setClientHeight] = useState<number>()
  const { token } = parseCookies()

  if (token && token !== 'undefined') {
    router.push('home')
  }

  const isPathnameWelcome = pathname === '/welcome'

  useEffect(() => {
    setClientHeight(document.documentElement.clientHeight)
  }, [])

  return (
    <Stack
      component="main"
      sx={{
        padding: 0,
        height: '100%',
        backgroundColor: isPathnameWelcome ? undefined : 'primary.main',
      }}
    >
      <IconButton
        size="large"
        LinkComponent={Link}
        href="/"
        sx={{
          position: 'absolute',
          marginTop: theme.spacing(6),
          marginLeft: theme.spacing(4),
        }}
      >
        <ArrowBack
          sx={{
            color: isPathnameWelcome ? 'primary.main' : 'primary.contrastText',
          }}
        />
      </IconButton>

      <Box component="section" sx={{ mx: 'auto', height: '43%' }}>
        <Image src={sweetIcon} alt="Sweet's Confeitaria Icon" />
      </Box>

      <Box
        component="section"
        sx={{
          backgroundColor: isPathnameWelcome ? 'primary.main' : 'tertiary.main',
          px: theme.spacing(6),
          py: theme.spacing(13),
          borderTopLeftRadius: '3.2rem',
          borderTopRightRadius: '3.2rem',
          height: `${clientHeight && clientHeight < 660 ? '100%' : '57%'}`,
        }}
      >
        {children}
      </Box>
    </Stack>
  )
}
