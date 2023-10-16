'use client'

import { useState } from 'react'

import { colors } from '@/styles/colors'
import { Close, Search } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'

export function SearchBar() {
  const [search, setSearch] = useState('')

  const handleMouseDownSearch = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <TextField
      type="text"
      variant="outlined"
      value={search}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: 20,
          },
        },
      }}
      placeholder="Insira um termo de busca"
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: colors.c7.hex() }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="large"
              onClick={() => setSearch('')}
              onMouseDown={handleMouseDownSearch}
            >
              {search ? <Close sx={{ color: colors.c7.hex() }} /> : null}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
