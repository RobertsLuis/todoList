import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../services/user.service';
import { FormBuilder, NonNullableFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgIf, CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css']
})
export class NewTaskFormComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Input() user!: User;

  private formBuilderService = inject(NonNullableFormBuilder);
  private taskService = inject(TaskService);


  protected form = this.formBuilderService.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  protected confirm() {
    this.taskService.createTask(
      this.user.id,
      this.form.value.title!,
      this.form.value.description!
    )
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}