import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TaskFormDialogComponent } from '../dialogs/task-form-dialog/task-form-dialog.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private taskService: TaskService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  abrirFormularioDialog() {
    this.ref = this.dialogService.open(TaskFormDialogComponent, {
      modal: true,
      dismissableMask: true,
      closable: true,
      width: '500px',
      header: 'Criar tarefa',
      breakpoints: { '500px': '95vw' },
    });

    this.ref.onClose.subscribe((curso) => {
      if (!curso) return;
      this.tasks.unshift(curso);
    });
  }

  onTaskEdit(taskEditada: Task) {
    const index = this.tasks.findIndex((task) => task.id == taskEditada.id);
    if (index > -1) this.tasks[index] = taskEditada;
  }

  onTaskConcluida(taskConcluida: Task) {
    this.tasks = this.tasks.filter((task) => task.id != taskConcluida.id);
  }

  loadTasks() {
    this.taskService.listPendingTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
    });
  }
}
