import { Inter, Lora } from 'next/font/google'

import { createTheme, inputClasses } from '@mui/material'

import { colors, pickShadowColors } from './colors'

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: lora.style.fontFamily,
    h1: {
      fontSize: '3.2rem',
      fontWeight: '600',
    },
    body2: {
      fontSize: '1.2rem',
    },
  },
  palette: {
    primary: {
      main: colors.c3.hex(),
      contrastText: colors.c2.hex(),
    },
    secondary: {
      main: colors.c6.hex(),
      contrastText: colors.c2.hex(),
    },
    tertiary: {
      main: colors.c2.hex(),
      light: colors.c2.lighten(0.1).hex(),
      dark: colors.c4.lighten(0.03).hexa(),
      contrastText: colors.c3.hex(),
    },
    background: {
      default: colors.c2.hex(),
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          width: 100%;
          height: 100%;
          font-size: 62.5%;
        },
        body {
          width: 100%;
          height: 100%;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 1.2,
        },
        contained: ({ ownerState }) => ({
          textTransform: 'none',
          fontSize: '2rem',
          borderRadius: '0.8rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.4rem',
          boxShadow: `0 0.4rem 0 0 ${pickShadowColors(ownerState.color)}`,

          ':hover': {
            boxShadow: `0 0.4rem 0 0 ${pickShadowColors(ownerState.color)}`,
          },
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          ':before': {
            borderColor: colors.c8.hex(),
          },
          [`:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]:
            {
              borderBottom: `2px solid ${colors.c3.hex()}`,
            },
        },
        input: {
          '::placeholder': {
            color: colors.c8.hex(),
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.c8.hex(),
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          MenuListProps: {
            sx: {
              maxHeight: '20rem',
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          ':before, :after': {
            border: `0.1rem solid ${colors.c7.hex()}`,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: colors.c4.hex(),
          borderRadius: '4rem 4rem 0 0',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            '&.MuiSvgIcon-root': {
              color: 'red',
            },
          },
        },
        label: {
          fontFamily: inter.style.fontFamily,
        },
      },
    },
  },
})
