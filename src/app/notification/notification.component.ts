import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CommonModule, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgClass, NgIf, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  show: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((message) => {
      this.message = message;
    });

    this.notificationService.show$.subscribe((show) => {
      this.show = show;
    });
  }
}
