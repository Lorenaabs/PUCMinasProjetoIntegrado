import { comparePassword } from '@auth'
import { prisma } from '@models'

import { NotificationContext } from './notificationContext'

import type { CreateUserDTO, UserLoginDTO } from '@types'

export class UsersValidation extends NotificationContext {
  constructor() {
    super()
  }

  async isLoginValid(body: UserLoginDTO) {
    const { email, password } = body
    const user = await prisma.users.findUnique({
      where: { email },
      select: { password: true }
    })
    const isPasswordTrue = await comparePassword(password, user?.password)

    if (!isPasswordTrue) {
      this.addNotification('username or password is invalid')
    }

    return !this.hasNotifications()
  }

  isCreateDtoValid(body: CreateUserDTO) {
    if (!body.name) {
      this.addNotification('name must not be empty')
    }

    if (!body.email) {
      this.addNotification('email must not be empty')
    }

    if (!body.role) {
      this.addNotification('role must not be empty')
    }

    return !this.hasNotifications()
  }
}
