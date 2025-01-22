import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return true;

  // canActiveAdmin(): boolean {
  //   if(authService.isUserAdmin()){
  //     return true;
  //   }else {
  //     router.navigate(['/home']);
  //     return false;
  //   }
  // }
};
