'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import CheckOutlined from '@mui/icons-material/CheckOutlined'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import PersonOutlined from '@mui/icons-material/PersonOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Select } from '@/components/Select'
import { colors } from '@/styles/colors'

export default function Signup() {
  const theme = useTheme()
  const { register, handleSubmit } = useForm<SignUpForm>()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    alert('Essa funcionalidade ainda não foi implementada')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  useEffect(() => {
    document.title = "Sweet's - SignUp"
  }, [])

  return (
    <>
      <Typography
        variant="h1"
        textAlign="center"
        color="tertiary.contrastText"
        marginBottom={10}
      >
        Cadastrar na Sweet’s
      </Typography>
      <Stack component="form" spacing={7} onSubmit={handleSubmit(onSubmit)}>
        <Select name="country" variant="standard" label="País">
          <MenuItem value="brazil">Brasil</MenuItem>
        </Select>
        <TextField
          {...register('name')}
          variant="standard"
          placeholder="Nome"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlined color="primary" />
              </InputAdornment>
            ),
          }}
        />
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
        <TextField
          {...register('confirm_password')}
          variant="standard"
          placeholder="Confirmar Senha"
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

        <Stack>
          <Button color="secondary" variant="contained" type="submit">
            Cadastrar
          </Button>
          <Divider sx={{ margin: `${theme.spacing(5)} 0 ${theme.spacing(3)}` }}>
            <Typography
              color={colors.c7.hex()}
              variant="body2"
              fontWeight={700}
            >
              ou
            </Typography>
          </Divider>
          <Button variant="contained" LinkComponent={Link} href="/login">
            Entrar
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
