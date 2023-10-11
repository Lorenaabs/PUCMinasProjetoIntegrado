import color from 'color'

export const colors = {
  c1: color('#DF5784'),
  c2: color('#F8F6EA'),
  c3: color('#F584A9'),
  c4: color('#CEDFE8'),
  c5: color('#FFDE59'),
  c6: color('#FFBD59'),
  c7: color('#545454'),
  c8: color('#737373'),
  c9: color('#E5608C'),
  c10: color('#B2700C'),
  c11: color('#EBEBF0'),
}

export function pickShadowColors(color?: string) {
  switch (color) {
    case 'primary':
      return colors.c9.hex()
    case 'secondary':
      return colors.c10.hex()
    case 'tertiary':
      return colors.c2.alpha(0.76).hexa() // #F8F6EAC2
    default:
      return colors.c8
  }
}
