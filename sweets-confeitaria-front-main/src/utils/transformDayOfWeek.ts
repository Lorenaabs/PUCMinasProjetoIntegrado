export function transformDayOfWeek(day: string) {
  switch (day) {
    case '2ª':
      return 'SEG'
    case '3ª':
      return 'TER'
    case '4ª':
      return 'QUA'
    case '5ª':
      return 'QUI'
    case '6ª':
      return 'SEX'
    case 'Sá':
      return 'SAB'
    case 'Do':
      return 'DOM'
    default:
      return ''
  }
}
