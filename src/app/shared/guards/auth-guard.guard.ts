import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let _AuthService: AuthService = inject(AuthService);
  let _Router: Router = inject(Router);

  if (_AuthService.userData.getValue() != null) {
    return true;
  } else {
    _Router.navigate(['/login']);
    return false;
  }
};
