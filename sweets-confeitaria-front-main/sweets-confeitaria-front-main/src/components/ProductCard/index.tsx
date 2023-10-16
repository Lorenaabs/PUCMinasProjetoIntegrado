import Image from 'next/image'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { colors } from '@/styles/colors'
import { Stack } from '@mui/material'

export function ProductCard(props: Product) {
  return (
    <Card
      sx={{
        backgroundColor: colors.c4.hex(),
        marginBottom: '1.6rem',
        borderRadius: '4rem 0 4rem 0',
        boxShadow: '0px 5px 0px 0px rgba(158, 195, 215, 1)',
      }}
    >
      <Stack flexDirection="row" sx={{ px: '2rem', py: '1rem' }}>
        <Stack>
          <CardMedia
            component={Image}
            sx={{ maxWidth: '7.2rem' }}
            image={props.imageUrl}
            alt={props.name}
          />
          <Typography variant="caption" fontWeight={700} color="text.secondary">
            R$ {Number(props.productValue).toFixed(2)}
          </Typography>
        </Stack>
        <CardContent sx={{ paddingTop: 0 }}>
          <Typography variant="body1" fontWeight={700} overflow="hidden">
            {props.name}
          </Typography>
          <Typography variant="caption" fontWeight={700} color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  )
}
