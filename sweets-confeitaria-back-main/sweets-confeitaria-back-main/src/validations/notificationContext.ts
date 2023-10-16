export class NotificationContext {
  protected notifications: string[]

  constructor() {
    this.notifications = []
  }

  clearNotifications() {
    this.notifications = []
  }

  hasNotifications() {
    return this.notifications.length > 0
  }

  addNotification(notification: string) {
    this.notifications.push(notification)
  }
}
