import ErrorIcon from '@mui/icons-material/ErrorOutline'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { colors } from '@/styles/colors'

interface EmptyListProps {
  firstText: string
  secondText: string
}

export function EmptyList({ firstText, secondText }: EmptyListProps) {
  return (
    <Stack
      textAlign="center"
      height="100%"
      alignItems="center"
      justifyContent="center"
      gap={8}
    >
      <ErrorIcon sx={{ color: colors.c8.hex(), height: 90, width: 90 }} />
      <Typography
        variant="h5"
        sx={{
          color: colors.c8.hex(),
        }}
      >
        {firstText}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: colors.c8.hex(),
        }}
      >
        {secondText}
      </Typography>
    </Stack>
  )
}
