import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ToastMessageService } from '../../../core/services/toast-message.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  taskParaEditar = input<Task>();
  taskEditada = output<Task>();
  taskCriada = output<Task>();
  formCancel = output<void>();

  constructor(
    private taskService: TaskService,
    private messageService: ToastMessageService
  ) {}

  private formBuilder = inject(FormBuilder);

  task_form: FormGroup = this.formBuilder.group({
    description: ['', Validators.compose([Validators.required])],
    priority: ['', Validators.compose([Validators.required])],
  });

  ngOnInit() {
    const taskParaEditar = this.taskParaEditar();
    if (taskParaEditar) this.task_form.patchValue(taskParaEditar);
  }

  isInvalidField(campo: string): boolean {
    const field = this.task_form.get(campo);

    if (field && field?.touched && field.invalid) return true;
    return false;
  }

  criarNovaTask() {
    const task = this.task_form.value;
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this.taskCriada.emit(createdTask);
      },
      error: (e) => {
        this.messageService.showErrorMessage(e.error.error);
      },
    });
  }

  editarTaskExistente() {
    const task = this.task_form.value;
    const taskParaEditar = this.taskParaEditar();
    const taskId = taskParaEditar?.id;
    if (!taskId) return;
    this.taskService.editTask(task, taskId).subscribe({
      next: (editedTask) => {
        this.taskEditada.emit(editedTask);
      },
      error: (e) => {
        this.messageService.showErrorMessage(e.error.error);
      },
    });
  }

  salvar() {
    this.task_form.markAllAsTouched();

    if (this.task_form.invalid) {
      this.messageService.showErrorMessage(
        'Preencha todos os campos obrigatórios'
      );
      return;
    }

    if (this.taskParaEditar()) {
      this.editarTaskExistente();
    } else {
      this.criarNovaTask();
    }
  }

  cancelar() {
    this.formCancel.emit();
  }
}
