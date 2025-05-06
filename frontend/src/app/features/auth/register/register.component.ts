import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ToastMessageService } from '../../../core/services/toast-message.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);

  constructor(
    private userService: UserService,
    private messageService: ToastMessageService,
    private router: Router
  ) {}

  create_user_form: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  isInvalidField(campo: string): boolean {
    const field = this.create_user_form.get(campo);

    if (field && field?.touched && field.invalid) return true;
    return false;
  }

  createUser() {
    this.create_user_form.markAllAsTouched();
    if (this.create_user_form.invalid) {
      this.messageService.showErrorMessage(
        'Preencha todos os campos corretamente.'
      );
      return;
    }
    const user = this.create_user_form.value;
    this.userService.createUser(user).subscribe({
      next: () => {
        this.messageService.showSuccessMessage('Usuário criado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.messageService.showErrorMessage(e.error.error);
      },
    });
  }
}
