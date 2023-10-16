import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { SearchBar } from '@/components/SearchBar'

export default function Search() {
  return (
    <Stack>
      <SearchBar />
      <Typography variant="body2" color="primary">
        Funcionalidades em desenvolvimento. Disponível em breve
      </Typography>
    </Stack>
  )
}
