import { colors } from '@/styles/colors'

export const styles = {
  textField: {
    color: colors.c7.hex(),
    borderRadius: 4,
    textAlign: 'end',

    '& .MuiInputBase-root': {
      backgroundColor: colors.c4.hex(),

      '&.Mui-focused': {
        backgroundColor: colors.c4.hex(),
      },
    },
  },
  helperText: {
    textAlign: 'end',
    color: colors.c1.hex(),
  },
  buttonAsInputFile: {
    backgroundColor: colors.c4.hex(),
    borderRadius: 4,
    py: 6,
  },
} as const
