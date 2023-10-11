import FormControl from '@mui/material/FormControl'
import Input, { InputProps, inputClasses } from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'

import { colors } from '@/styles/colors'

interface CustomInputProps extends InputProps {
  label: string
  multiline?: boolean
}

export function CustomInput({ label, multiline, ...props }: CustomInputProps) {
  return (
    <FormControl focused>
      <InputLabel
        sx={{
          fontWeight: 600,
          fontSize: '2.4rem',
          '&.Mui-focused': {
            color: colors.c1.hex(),
          },
        }}
      >
        {label}
      </InputLabel>
      <Input
        {...props}
        multiline={multiline}
        minRows={3}
        sx={{
          backgroundColor: colors.c4.hex(),
          color: colors.c7.hex(),
          borderRadius: 4,
          px: '1.6rem',
          py: '0.4rem',
          '&:before': {
            borderBottom: 'unset',
          },
          [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]:
            {
              borderBottom: '4px',
            },
          '&:after': {
            borderBottom: 'unset',
          },
        }}
      />
      {/* <FormHelperText sx={{ color: colors.c1.hex(), textAlign: 'end' }}>
        0/50
      </FormHelperText> */}
    </FormControl>
  )
}
