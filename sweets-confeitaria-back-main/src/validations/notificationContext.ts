export class NotificationContext {
  protected notifications: string[]

  constructor() {
    this.notifications = []
  }

  clearNotifications() {
    setTimeout(() => {
      this.notifications = []
    }, 3000)
  }

  hasNotifications() {
    return this.notifications.length > 0
  }

  addNotification(notification: string) {
    this.notifications.push(notification)
  }
}
