import { Component } from '@angular/core';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { Task } from '../../models/task';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-form-dialog',
  imports: [TaskFormComponent],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.css',
})
export class TaskFormDialogComponent {
  taskParaEditar: Task | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data && this.config.data.taskParaEditar)
      this.taskParaEditar = this.config.data.taskParaEditar;
  }

  onCreate(taskCriada: Task) {
    this.ref.close(taskCriada);
  }

  onEdit(taskEditada: Task) {
    this.ref.close(taskEditada);
  }

  sair() {
    this.ref.close();
  }
}
