import path from 'node:path'

import multer from 'multer'

const publicFolder = path.resolve(__dirname, '..', '..', 'public')
export const uploadConfig = {
  directory: publicFolder,
  storage: multer.diskStorage({
    destination: publicFolder,
    filename(_req, file, cb) {
      const fileName = file.originalname

      return cb(null, fileName)
    }
  })
}
