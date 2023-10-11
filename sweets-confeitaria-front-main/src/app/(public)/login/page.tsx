'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import CheckOutlined from '@mui/icons-material/CheckOutlined'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MuiLink from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ResponseError } from '@/errors/response'
import { login } from '@/services/api'
import { colors } from '@/styles/colors'

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<LoginForm>()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      const response = await login({
        email,
        password,
      })

      if (response instanceof ResponseError) {
        return console.log('Erro, ainda em desenvolvimento')
      }

      router.push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  useEffect(() => {
    document.title = "Sweet's - Login"
  }, [])

  return (
    <>
      <Typography
        variant="h1"
        textAlign="center"
        color="tertiary.contrastText"
        marginBottom={10}
      >
        Entrar na Sweet’s
      </Typography>
      <Stack component="form" spacing={7} onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack spacing={5}>
            <TextField
              {...register('email')}
              variant="standard"
              placeholder="E-mail"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box padding={3}>
                      <CheckOutlined sx={{ color: colors.c8.hex() }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              placeholder="Senha"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="large"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <MuiLink
            component={Link}
            marginTop={4}
            alignSelf="flex-end"
            href="#"
            sx={{ textDecorationColor: colors.c7.hex() }}
            width="max-content"
            onClick={() =>
              alert('Essa funcionalidade ainda não foi implementada!')
            }
          >
            <Typography
              color={colors.c7.hex()}
              sx={{ ':hover': { color: 'primary.main' } }}
              variant="body2"
              fontWeight={700}
            >
              Esqueceu a senha?
            </Typography>
          </MuiLink>
        </Stack>

        <Stack>
          <Button color="secondary" variant="contained" type="submit">
            Entrar
          </Button>
          <Divider sx={{ margin: '2rem 0 1.2rem' }}>
            <Typography
              color={colors.c7.hex()}
              variant="body2"
              fontWeight={700}
            >
              ou
            </Typography>
          </Divider>
          <Button variant="contained" LinkComponent={Link} href="/home">
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
