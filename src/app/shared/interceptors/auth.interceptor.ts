import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  if (req.url.includes('/api/public/auth/login') || req.url.includes('/api/public/auth/register') || req.url.includes('/api/public/auth/register-employeer')) {
    return next(req);
  }
  if(authToken) {
    const clonedReq = req.clone({
      headers: req.headers.append('Authorization', authToken)
                  // .append('withCredentials', 'true')
                  .append('Content-Type', 'Application/json')

    })
    return next(clonedReq);
  }

  return next(req);
};
