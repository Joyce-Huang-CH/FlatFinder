import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    switchMap(user => {
      if (!user) {
        router.navigate(['/']);
        return of(false);
      }
      return from(authService.getUserProfile(user.uid)).pipe(
        map(userProfile => {
          if (!userProfile?.isAdmin) {
            router.navigate(['/']);
            return false;
          }
          return true;
        })
      );
    })
  );
};
