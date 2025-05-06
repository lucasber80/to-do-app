import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  showErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
    });
  }

  showSuccessMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
  }

  showNeutralMessage(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Aviso',
      detail: message,
    });
  }
}
