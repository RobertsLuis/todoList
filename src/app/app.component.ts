import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { UserCardComponent } from "./user-card/user-card.component";
import { userTasks } from './user-tasks/user-tasks.component';
import { Task } from './services/task.service';
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService } from './services/notification.service';

export function getFormatedData(){
  const now = new Date();
  const timezone = -3 * 60

  now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + timezone)
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear())
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return day + "/" + month + "/" + year + " " + hours + ":" +minutes + ":" + seconds
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent, userTasks, CommonModule, NgFor, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  users = DUMMY_USERS;
  tasks = DUMMY_TASKS;
  selectedUserId?: string;
  notificationMessage!: string;

  get selectedUser(){
    return this.users.find((user) => user.id === this.selectedUserId)!;
  }

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.user_id === this.selectedUserId);
  }

  handlerUserCardSelection(userId: string){
    console.log("Usuário selecionado: " + userId)
    this.selectedUserId = userId
  }

}
