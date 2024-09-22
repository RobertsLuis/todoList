import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string>('');
  private showSubject = new BehaviorSubject<boolean>(false);

  notification$ = this.notificationSubject.asObservable();
  show$ = this.showSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);
    this.showSubject.next(true);

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
      this.hideNotification();
    }, 3000);
  }

  hideNotification() {
    this.showSubject.next(false);
  }
}
