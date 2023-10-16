import DeleteIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { colors } from '@/styles/colors'

interface NewProductItemProps {
  name: string
  quantity: number
  type: string
  deleteAction: () => void
}

const translateValues: { [key: string]: string } = {
  grams: 'Gramas',
  unit: 'Unidade',
  spoon_sob: 'Colher Sob',
  spoon_sop: 'Colher Sop',
  pitada: 'Pitada',
}

function ItemActions({ deleteAction }: Partial<NewProductItemProps>) {
  return (
    <IconButton
      size="small"
      edge="end"
      aria-label="delete"
      onClick={deleteAction}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export function NewProductItem({
  name,
  quantity,
  type,
  deleteAction,
}: NewProductItemProps) {
  const secondaryText = `${+quantity} ${translateValues[type]}`.toLowerCase()
  return (
    <ListItem
      sx={{
        backgroundColor: colors.c4.hex(),
        my: '0.8rem',
        borderRadius: '0.8rem',
        borderWidth: '2px',
        borderColor: colors.c6.hex(),
        borderStyle: 'solid',
        py: '0.4rem',
      }}
      secondaryAction={<ItemActions deleteAction={deleteAction} />}
    >
      <ListItemText primary={name} secondary={secondaryText} />
    </ListItem>
  )
}
