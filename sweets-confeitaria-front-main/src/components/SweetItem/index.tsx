import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

import { colors } from '@/styles/colors'
import Link from 'next/link'

interface SweetItemProps {
  id: number
  name?: string
  href: string
}

function ItemActions({ id, href }: SweetItemProps) {
  return (
    <Stack direction="row">
      <IconButton
        LinkComponent={Link}
        href={href}
        size="small"
        edge="end"
        aria-label="view"
      >
        <VisibilityIcon />
      </IconButton>
      <IconButton size="small" edge="end" aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton size="small" edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

export function SweetItem({ id, name, href }: SweetItemProps) {
  return (
    <ListItem
      sx={{
        backgroundColor: colors.c4.hex(),
        my: '0.8rem',
        borderRadius: '0.8rem',
        py: '0.4rem',
      }}
      secondaryAction={<ItemActions id={id} href={href} />}
    >
      <ListItemText primary={name} />
    </ListItem>
  )
}
