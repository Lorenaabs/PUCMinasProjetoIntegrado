'use client'

import { useRouter } from 'next/navigation'

import AddAPhoto from '@mui/icons-material/AddAPhotoOutlined'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { parseCookies } from 'nookies'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Select } from '@/components/Select'
import { VisuallyHiddenInput } from '@/components/VisuallyHiddenInput'
import { createProduct } from '@/services/api'
import { colors } from '@/styles/colors'
import { styles } from './_styles'

export default function NewProduct({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const router = useRouter()
  const { register, handleSubmit, watch, setValue } = useForm<Product>({
    defaultValues: {
      name: '',
      description: '',
      ingredients: [],
      preparation: '',
      packs: [],
    },
  })

  const [name, description, ingredients, preparation, packs, image] = watch([
    'name',
    'description',
    'ingredients',
    'preparation',
    'packs',
    'image',
  ])

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const { token } = parseCookies()
    await createProduct(data, token)
    router.push(`/categories/${categoryId}`)
  }

  return (
    <Stack gap={4}>
      <Typography
        textAlign="center"
        variant="body1"
        color={colors.c1.hex()}
        fontWeight={700}
      >
        NOVO PRODUTO
      </Typography>
      <Stack
        component="form"
        gap={4}
        onSubmit={handleSubmit(onSubmit)}
        paddingBottom="10rem"
      >
        <TextField
          {...register('name')}
          label="Nome"
          variant="filled"
          helperText={`${name.length}/50`}
          inputProps={{ maxLength: 50 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />
        <TextField
          {...register('description')}
          label="Descrição"
          variant="filled"
          multiline
          minRows={3}
          helperText={`${description.length}/200`}
          inputProps={{ maxLength: 200 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <Stack flexDirection="row" alignItems="center">
          <TextField
            {...register('bakeTime')}
            label="Tempo de Montagem"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Select label="" value="minute" color="secondary">
            <MenuItem value="minute">Min</MenuItem>
          </Select>
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <TextField
            {...register('receiptQuantity')}
            label="Quantidade da Receita"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Select label="" value="unit" color="secondary">
            <MenuItem value="unit">Und.</MenuItem>
          </Select>
        </Stack>

        <TextField
          label="Ingrediente"
          variant="filled"
          helperText={`${[].length}/50`}
          inputProps={{ maxLength: 50 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <Stack flexDirection="row" alignItems="center">
          <TextField
            label="Quantidade"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Select label="" value="" color="secondary">
            <MenuItem value="grams">Gramas</MenuItem>
            <MenuItem value="unit">Unidade</MenuItem>
            <MenuItem value="spoon_sob">Colher Sob</MenuItem>
            <MenuItem value="spoon_sop">Colher Sop</MenuItem>
            <MenuItem value="pitada">Pitada</MenuItem>
          </Select>
        </Stack>

        <TextField
          {...register('preparation')}
          label="Modo de Preparo"
          variant="filled"
          multiline
          minRows={4}
          helperText={`${preparation.length}/2000`}
          inputProps={{ maxLength: 2000 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <TextField
          label="Embalagem"
          variant="filled"
          helperText={`${[].length}/50`}
          inputProps={{ maxLength: 50 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <Stack flexDirection="row" alignItems="center">
          <TextField
            label="Quantidade"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Select label="" color="secondary" value="">
            <MenuItem value="unit">Unidade</MenuItem>
          </Select>
        </Stack>

        <TextField
          {...register('receiptCost')}
          label="Custo da Receita"
          variant="filled"
          sx={styles.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />

        <TextField
          {...register('productValue')}
          label="Valor do Produto"
          variant="filled"
          sx={styles.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />

        <ButtonBase component="label" sx={styles.buttonAsInputFile}>
          {image?.length ? (
            <Avatar
              sx={{
                width: '6.4rem',
                height: '6.4rem',
                borderRadius: '25%',
              }}
              alt="Imagem do produto"
              src={URL.createObjectURL(image[0])}
            />
          ) : (
            <AddAPhoto sx={{ color: colors.c8.hex() }} />
          )}
          <VisuallyHiddenInput {...register('image')} type="file" />
        </ButtonBase>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{
            width: '8.6rem',
            color: colors.c7.hex(),
            fontWeight: 700,
            alignSelf: 'center',
          }}
        >
          Criar
        </Button>
      </Stack>
    </Stack>
  )
}
