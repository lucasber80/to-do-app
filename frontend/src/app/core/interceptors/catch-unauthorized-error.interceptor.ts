import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

export const catchUnauthorizedErrorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const tokenService = inject(TokenStorageService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenService.signOut();
      }
      return throwError(() => error);
    })
  );
};
