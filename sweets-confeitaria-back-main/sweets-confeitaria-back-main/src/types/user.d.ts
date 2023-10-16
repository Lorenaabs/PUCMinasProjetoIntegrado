import { $Enums } from '@prisma/client'

export interface UserLoginDTO {
  email: string
  password: string
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  country: string
  role: $Enums.Role
}

export interface User {
  id: string
  email: string
  name: string
  country: string
  role: $Enums.Role
}
