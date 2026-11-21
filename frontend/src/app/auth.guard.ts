import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api.service';
import { catchError, map, of } from 'rxjs';
export const authGuard: CanActivateFn = (route) => {
  const api = inject(ApiService), router = inject(Router);
  const token = localStorage.getItem('vmazz_access_token');
  if (!token) { router.navigate(['/login'], { queryParams: { returnUrl: route.url.map(s => s.path).join('/') } }); return false; }
  const allowed = route.data?.['roles'] as string[] | undefined;
  return api.me().pipe(
    map(user => {
      localStorage.setItem('vmazz_role', user.role);
      localStorage.setItem('vmazz_user', JSON.stringify(user));
      const permitted = !allowed?.length || allowed.includes(user.role);
      if (!permitted) router.navigate(['/dashboard']);
      return permitted;
    }),
    catchError(error => {
      if (error?.status === 401) {
        localStorage.removeItem('vmazz_access_token');
        localStorage.removeItem('vmazz_role');
        localStorage.removeItem('vmazz_user');
        router.navigate(['/login'], { queryParams: { reason: 'session-expired' } });
      } else {
        // Network/server errors must not silently sign the user out.
        router.navigate(['/dashboard']);
      }
      return of(false);
    })
  );
};
