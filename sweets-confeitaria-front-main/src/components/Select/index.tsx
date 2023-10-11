import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MuiSelect, { SelectProps } from '@mui/material/Select'

interface MuiSelect extends SelectProps {
  label: string
}

export function Select(props: MuiSelect) {
  return (
    <FormControl variant={props.variant} sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`mui-select-label-${props.label}`}>
        {props.label}
      </InputLabel>
      <MuiSelect
        labelId={`mui-select-label-${props.label}`}
        id={`mui-select-${props.label}`}
        {...props}
      >
        {props.children}
      </MuiSelect>
    </FormControl>
  )
}
