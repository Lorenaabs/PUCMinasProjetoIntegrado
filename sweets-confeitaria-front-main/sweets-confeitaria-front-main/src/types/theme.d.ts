import { PaletteColor, PaletteColorOptions } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    tertiary: true
  }
}
