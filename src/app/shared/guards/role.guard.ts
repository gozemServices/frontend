import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get the required roles from the route data
  const requiredRoles: string[] = route.data['roles'] || [];

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    const userRole = authService.getUserRole(); 
    if (requiredRoles.includes(userRole ?? '')) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  router.navigate(['/auth/login']);
  return false;
};
