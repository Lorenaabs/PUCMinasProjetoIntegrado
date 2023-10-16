import { NotificationContext } from './notificationContext'

import type { CreateCategoryDTO } from '@types'

export class CategoriesValidation extends NotificationContext {
  constructor() {
    super()
  }

  isCreateDtoValid(body: CreateCategoryDTO) {
    if (!body.name) {
      this.addNotification('name must not be empty')
    }

    if (!body.imageUrl) {
      this.addNotification('imageUrl must not be empty')
    }

    return !this.hasNotifications()
  }
}
