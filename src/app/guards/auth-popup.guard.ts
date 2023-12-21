import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { UserService } from '@services/user.service';

export const authPopupGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const isAuthenticated = toSignal(userService.isAuthenticated(), { initialValue: false });
  return !isAuthenticated();
};
