import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environments';

export const completeUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiURL;
  req = req.clone({
    url: `${apiUrl}${req.url}`,
  });
  return next(req);
};
