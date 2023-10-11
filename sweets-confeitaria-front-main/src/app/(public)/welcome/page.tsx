'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export default function AppEntrance() {
  const theme = useTheme()

  useEffect(() => {
    document.title = "Sweet's - Welcome"
  }, [])

  return (
    <>
      <Box sx={{ color: 'primary.contrastText' }}>
        <Typography
          sx={{ margin: `${theme.spacing(6)} 0 ${theme.spacing(12)} 0` }}
          variant="h5"
          textAlign="center"
        >
          Parabéns, você se cadastrou no <b>App Confeitaria Sweet’s.</b> Você
          receberá uma confirmação no seu e-mail.
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
      </Stack>
    </>
  )
}
