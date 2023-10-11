'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import sweetIcon from '@root/public/icons/android-chrome-256x256.png'

export default function AppEntrance() {
  const theme = useTheme()
  const [clientHeight, setClientHeight] = useState<number>()

  useEffect(() => {
    setClientHeight(document.documentElement.clientHeight)
  }, [])

  return (
    <Stack component="main" sx={{ padding: 0, height: '100%' }}>
      <Box component="picture" sx={{ mx: 'auto', height: '43%' }}>
        <Image src={sweetIcon} alt="Sweet's Confeitaria Icon" />
      </Box>

      <Box
        component="section"
        sx={{
          backgroundColor: 'primary.main',
          px: theme.spacing(8),
          py: theme.spacing(13),
          borderTopLeftRadius: '3.2rem',
          borderTopRightRadius: '3.2rem',
          height: `${clientHeight && clientHeight < 660 ? '100%' : '57%'}`,
        }}
      >
        <Box sx={{ color: 'primary.contrastText' }}>
          <Typography variant="h1" textAlign="center">
            Seja Bem Vindo!
          </Typography>
          <Typography
            sx={{ margin: `${theme.spacing(6)} 0 ${theme.spacing(12)} 0` }}
            variant="body1"
            textAlign="justify"
          >
            Essa é a área onde poderás encontrar as delícias da Confeitaria
            Sweet’s. Caso já tenha uma conta, clique em Entrar, senão, clique em
            Cadastrar.
          </Typography>
        </Box>

        <Stack spacing={9}>
          <Button
            LinkComponent={Link}
            href="/login"
            color="secondary"
            variant="contained"
          >
            Entrar
          </Button>
          <Button
            LinkComponent={Link}
            href="/signup"
            color="tertiary"
            variant="contained"
          >
            Cadastrar
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
