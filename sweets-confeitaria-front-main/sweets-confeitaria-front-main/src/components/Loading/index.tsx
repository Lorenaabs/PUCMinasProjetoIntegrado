import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

export function Loading() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  )
}
