import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
];
