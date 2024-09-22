import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DUMMY_TASKS } from '../../dummy-tasks';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { Task, TaskService } from '../services/task.service';



@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})

export class TaskCardComponent {

  @Input({required: true}) task!: Task
  @Output() deleteTaskSignal = new EventEmitter<Task>()
  @Output() completeTaskSignal = new EventEmitter<void>()
  editing = false
  private formBuilderService = inject(NonNullableFormBuilder);
  
  protected form = this.formBuilderService.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  private notificationService = inject(NotificationService)
  private taskService = inject(TaskService)

  editButtonOnClick(){
    console.log("Estava: "+this.editing)
    this.editing = !this.editing
    this.form.setValue({
      description:this.task.description,
      title: this.task.title
    })
    console.log("Virou: "+this.editing)
  }

  confirmEditionButtonOnClick() {
    const title = this.form.value['title']!
    const description = this.form.value['description']!
    this.taskService.editTask(this.task.id, title, description)
    this.editing = !this.editing
  }

  cancelEditionButtonOnClick() {
    this.editing = !this.editing
  }

  deleteButtonOnClick() {
    this.deleteTaskSignal.emit(this.task); // open pop-up
  }

  completeButtonOnClick(){
    this.taskService.completeTaskById(this.task.id)
  }

}
