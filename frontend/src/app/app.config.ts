import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { catchUnauthorizedErrorInterceptor } from './core/interceptors/catch-unauthorized-error.interceptor';
import { completeUrlInterceptor } from './core/interceptors/complete-url.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: false || 'none',
          cssLayer: false,
        },
      },
    }),
    provideHttpClient(
      withInterceptors([
        completeUrlInterceptor,
        authInterceptor,
        catchUnauthorizedErrorInterceptor,
      ])
    ),
    MessageService,
  ],
};
