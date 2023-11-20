import { Notify } from 'quasar';

export class NotificationService {
  static createNotification(message: string, type = 'negative') {
    return Notify.create({
      type,
      message: message,
      position: 'top-right',
      timeout: 10000,
    });
  }
}
