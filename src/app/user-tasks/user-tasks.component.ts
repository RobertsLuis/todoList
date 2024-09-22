import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TaskCardComponent } from "../task-card/task-card.component";
import { Task, TaskService } from '../services/task.service';
import { DeleteTaskConfirmationComponent } from "../pop-ups/delete-task-confirmation/delete-task-confirmation.component";
import { NewTaskFormComponent } from "../pop-ups/new-task-form/new-task-form.component";
import { User } from '../services/user.service';
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [TaskCardComponent, DeleteTaskConfirmationComponent, NewTaskFormComponent],
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})

export class userTasks{

  @Input() user!: User;
  @Input() tasks?: Task[];
  
  @Output() notification = new EventEmitter<string>();

  taskDeletionConfirmationPopUp = false;
  taskToDelete!: Task;
  taskCreationPopUp = false;

  constructor(private notificationService: NotificationService) {}

  handlerTaskDeletion(task: Task){
    this.taskDeletionConfirmationPopUp = true
    this.taskToDelete = task
  }

  get taskToDeleteInfos(){
    return this.taskToDelete
  }

  openNewTaskPopUp() {
    this.taskCreationPopUp = true
  }

  handlerConfirmDeletion(){
    this.taskDeletionConfirmationPopUp = false
  }

  handlerCancelDeletion(){
    this.taskDeletionConfirmationPopUp = false
  }

  handlerConfirmCreation(){
    this.taskCreationPopUp = false
  }

  handlerCancelCreation(){
    this.taskCreationPopUp = false
  }

}