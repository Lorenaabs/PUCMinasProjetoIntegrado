import { NotificationContext } from './notificationContext'

import type { CreateProductDTO } from '@types'

export class ProductsValidation extends NotificationContext {
  constructor() {
    super()
  }

  isCreateDtoValid(body: CreateProductDTO) {
    if (!body.name) {
      this.addNotification('name must not be empty')
    }

    if (!body.description) {
      this.addNotification('description must not be empty')
    }

    if (!body.bakeTime) {
      this.addNotification('bakeTime must not be empty')
    } else if (typeof(body.bakeTime) !== 'number') {
      this.addNotification('bakeTime must be a number')
    }

    if (!body.receiptQuantity) {
      this.addNotification('receiptQuantity must not be empty')
    } else if (typeof(body.receiptQuantity) !== 'number') {
      this.addNotification('receiptQuantity must be a number')
    }

    if (!body.ingredients) {
      this.addNotification('ingredients must not be empty')
    }

    if (!body.packs) {
      this.addNotification('packs must not be empty')
    }

    if (!body.receiptCost) {
      this.addNotification('receiptCost must not be empty')
    }

    if (!body.productValue) {
      this.addNotification('productValue must not be empty')
    }

    if (!body.imageUrl) {
      this.addNotification('image must not be empty')
    }

    if (!body.categoryId) {
      this.addNotification('categoryId must not be empty')
    }

    return !this.hasNotifications()
  }
}
