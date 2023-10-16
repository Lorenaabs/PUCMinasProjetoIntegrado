'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhotoOutlined'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { parseCookies } from 'nookies'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { NewProductItem } from '@/components/NewProductItem'
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
  const { register, handleSubmit, watch, control, setValue, resetField } =
    useForm<CreateProductForm>({
      defaultValues: {
        name: '',
        description: '',
        ingredientName: '',
        ingredientQuantity: 0,
        ingredientType: 'grams',
        ingredients: [],
        preparation: '',
        packName: '',
        packQuantity: 0,
        packType: 'unit',
        packs: [],
      },
    })

  const [loading, setLoading] = useState(false)

  const ingredients = watch('ingredients')
  const packs = watch('packs')

  const [
    name,
    description,
    ingredientName,
    ingredientQuantity,
    ingredientType,
    preparation,
    packName,
    packQuantity,
    packType,
    image,
  ] = watch([
    'name',
    'description',
    'ingredientName',
    'ingredientQuantity',
    'ingredientType',
    'preparation',
    'packName',
    'packQuantity',
    'packType',
    'image',
  ])

  const isIngredientValid =
    ingredientName && Number(ingredientQuantity) && ingredientType
  const isPackValid = packName && Number(packQuantity) && packType

  const onSubmit: SubmitHandler<CreateProductForm> = async (data) => {
    setLoading(true)
    try {
      const { token } = parseCookies()
      await createProduct({ ...data, categoryId }, token)
      router.push(`/categories/${categoryId}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddList = (list: string) => {
    switch (list) {
      case 'ingredient':
        setValue('ingredients', [
          ...ingredients,
          {
            name: ingredientName,
            quantity: ingredientQuantity,
            type: ingredientType,
          },
        ])
        resetField('ingredientName')
        resetField('ingredientQuantity')
        resetField('ingredientType')
        break
      case 'pack':
        setValue('packs', [
          ...packs,
          {
            name: packName,
            quantity: packQuantity,
            type: packType,
          },
        ])
        resetField('packName')
        resetField('packQuantity')
        resetField('packType')
        break
      default:
        return null
    }
  }

  const handleDeleteList = (id: number, list: string) => {
    switch (list) {
      case 'ingredient':
        setValue(
          'ingredients',
          ingredients.filter((_, index) => index !== id),
        )
        break
      case 'pack':
        setValue(
          'packs',
          packs.filter((_, index) => index !== id),
        )
        break
      default:
        return null
    }
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
          helperText={`${name?.length}/50`}
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
          helperText={`${description?.length}/200`}
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
          {...register('ingredientName')}
          label="Ingrediente"
          variant="filled"
          helperText={`${ingredientName?.length}/50`}
          inputProps={{ maxLength: 50 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <Stack flexDirection="row" alignItems="center">
          <TextField
            {...register('ingredientQuantity')}
            label="Quantidade do ingrediente"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Controller
            control={control}
            name="ingredientType"
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                color="secondary"
              >
                <MenuItem value="grams">Gramas</MenuItem>
                <MenuItem value="unit">Unidade</MenuItem>
                <MenuItem value="spoon_sob">Colher Sob</MenuItem>
                <MenuItem value="spoon_sop">Colher Sop</MenuItem>
                <MenuItem value="pitada">Pitada</MenuItem>
              </Select>
            )}
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAddList('ingredient')}
          disabled={!isIngredientValid}
          sx={{
            width: 'max-content',
            color: colors.c7.hex(),
            fontWeight: 700,
            alignSelf: 'center',
          }}
        >
          Adicionar
        </Button>

        <Stack>
          {ingredients.map((ingredient, index) => (
            <NewProductItem
              key={ingredient.name}
              deleteAction={() => handleDeleteList(index, 'ingredient')}
              {...ingredient}
            />
          ))}
        </Stack>

        <TextField
          {...register('preparation')}
          label="Modo de Preparo"
          variant="filled"
          multiline
          minRows={4}
          helperText={`${preparation?.length}/2000`}
          inputProps={{ maxLength: 2000 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <TextField
          {...register('packName')}
          label="Embalagem"
          variant="filled"
          helperText={`${packName?.length}/50`}
          inputProps={{ maxLength: 50 }}
          sx={styles.textField}
          FormHelperTextProps={{
            sx: styles.helperText,
          }}
        />

        <Stack flexDirection="row" alignItems="center">
          <TextField
            {...register('packQuantity')}
            label="Quantidade da embalagem"
            variant="filled"
            type="number"
            sx={styles.textField}
          />
          <Controller
            control={control}
            name="packType"
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                color="secondary"
              >
                <MenuItem value="unit">Unidade</MenuItem>
              </Select>
            )}
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          disabled={!isPackValid}
          onClick={() => handleAddList('pack')}
          sx={{
            width: 'max-content',
            color: colors.c7.hex(),
            fontWeight: 700,
            alignSelf: 'center',
          }}
        >
          Adicionar
        </Button>

        <Stack>
          {packs.map((pack, index) => (
            <NewProductItem
              key={pack.name}
              deleteAction={() => handleDeleteList(index, 'pack')}
              {...pack}
            />
          ))}
        </Stack>

        <TextField
          {...register('receiptCost')}
          label="Custo da Receita"
          variant="filled"
          type="number"
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
          type="number"
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
          disabled={loading}
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
          {loading ? <CircularProgress size={30} /> : 'Criar'}
        </Button>
      </Stack>
    </Stack>
  )
}
