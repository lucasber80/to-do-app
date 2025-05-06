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
import { AuthService } from '../../../core/auth/auth.service';
import { TokenStorageService } from '../../../core/auth/token-storage.service';
import { ToastMessageService } from '../../../core/services/toast-message.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  constructor(
    private messageService: ToastMessageService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  login_form: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  isInvalidField(campo: string): boolean {
    const field = this.login_form.get(campo);

    if (field && field?.touched && field.invalid) return true;
    return false;
  }

  login() {
    this.login_form.markAllAsTouched();
    if (this.login_form.invalid) {
      this.messageService.showErrorMessage(
        'Preencha todos os campos corretamente.'
      );
      return;
    }

    const { email, password } = this.login_form.value;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data.user);
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.messageService.showErrorMessage(e.error.error);
      },
    });
  }
}
