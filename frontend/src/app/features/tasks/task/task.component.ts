import { Component, input, output } from '@angular/core';
import { Task } from '../models/task';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskFormDialogComponent } from '../dialogs/task-form-dialog/task-form-dialog.component';
import { TaskService } from '../services/task.service';
import { ToastMessageService } from '../../../core/services/toast-message.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(
    public dialogService: DialogService,
    private taskService: TaskService,
    private messageService: ToastMessageService
  ) {}
  ref: DynamicDialogRef | undefined;

  get task() {
    return this.taskInput();
  }

  taskInput = input<Task>();
  taskEditada = output<Task>();
  taskConcluida = output<Task>();

  completeTask() {
    if (this.task)
      this.taskService.completeTask(this.task.id).subscribe({
        next: (taskConcluida) => {
          this.taskConcluida.emit(taskConcluida);
          this.messageService.showSuccessMessage('Tarefa concluída.');
        },
        error: () => {
          this.messageService.showSuccessMessage(
            'Houve um erro ao concluir tarefa.'
          );
        },
      });
  }

  abrirFormularioEdicaoDialog() {
    this.ref = this.dialogService.open(TaskFormDialogComponent, {
      modal: true,
      dismissableMask: true,
      closable: true,
      width: '500px',
      header: 'Criar tarefa',
      breakpoints: { '500px': '95vw' },
      data: { taskParaEditar: this.taskInput() },
    });
    this.ref.onClose.subscribe((task) => {
      if (!task) return;
      this.taskEditada.emit(task);
    });
  }
}
