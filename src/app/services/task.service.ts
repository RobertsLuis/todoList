import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service'; // caminho do seu serviço de notificação
import { DUMMY_TASKS } from '../../dummy-tasks';
import { getFormatedData } from '../app.component';
import { UserService } from './user.service';

export interface Task{
  id: string,
  title: string,
  creation_time: string,
  status: number,
  description: string,
  due_time: string,
  user_id: string
}

@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private notificationService = inject(NotificationService)
  private userService = inject(UserService)

  findTaskIndexById(id: string){
    const index = DUMMY_TASKS.findIndex(item => item.id == id)
    
    return index
  }
  
  completeTaskById(id: string){
    const index = this.findTaskIndexById(id)
    DUMMY_TASKS[index].status = 1
    DUMMY_TASKS[index].due_time = getFormatedData()
  }
  
  deleteTaskById(id: string){
    const index = this.findTaskIndexById(id);
    DUMMY_TASKS.splice(index, 1);
    this.notificationService.showNotification("Task deleted successfully");
  }
  
  createTask(user_id: string, title: string, description: string, due_time: string = "", status: number = 0) {
    const creation_time = getFormatedData();
    const task: Task = {
      id: "t" + String(Number(DUMMY_TASKS[DUMMY_TASKS.length-1].id.replace("t",""))+1),
      title: title,
      user_id: user_id,
      description: description,
      creation_time: creation_time,
      status: status,
      due_time: due_time,
    };
    DUMMY_TASKS.push(task);
    //console.log(JSON.stringify(DUMMY_TASKS, null, 2));
    
    this.notificationService.showNotification('Task: "'+ title+ '" created successfully for the user: '+ this.userService.findUserById(user_id)?.name);
  }

  editTask(id: string, title: string, description: string){
    const index = this.findTaskIndexById(id)
    DUMMY_TASKS[index].title = title
    DUMMY_TASKS[index].description = description
    this.notificationService.showNotification("Task edited successfully!");
  }

}
