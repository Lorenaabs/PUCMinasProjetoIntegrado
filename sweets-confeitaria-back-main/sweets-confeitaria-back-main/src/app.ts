import cors from 'cors'
import express from 'express'

import { uploadConfig } from '@configs'
import { errorMiddleware } from '@errors'
import { router } from '@routes'

const BASE_URL_V1 = '/api/v1'

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
app.use('/public', express.static(uploadConfig.directory))
app.use(`${BASE_URL_V1}`, router)

app.use(errorMiddleware)

export default app
