import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-delete-task-confirmation-popup',
  templateUrl: './delete-task-confirmation.component.html',
  styleUrls: ['./delete-task-confirmation.component.css']
})
export class DeleteTaskConfirmationComponent {
  @Input() taskToDelete!: Task;
  
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  private taskService = inject(TaskService);


  confirm() {
      this.taskService.deleteTaskById(this.taskToDelete.id)
      this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}

