import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { UserService } from '@services/user.service';

export const adminAccessGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const allow = toSignal(userService.hasAdminPermissions(), { initialValue: false });
  return allow();
};
