import Add from '@mui/icons-material/Add'
import Button, { ButtonProps } from '@mui/material/Button'

export function AddButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="contained"
      color="secondary"
      sx={{
        height: '4.8rem',
        width: '4.8rem',
        minWidth: 'unset',
        borderRadius: '50%',
        padding: 0,
        alignSelf: 'flex-end',
        position: 'fixed',
        bottom: 84,
      }}
    >
      <Add
        sx={{ position: 'absolute', height: '3.6rem', width: '3.6rem' }}
        color="tertiary"
      />
    </Button>
  )
}
