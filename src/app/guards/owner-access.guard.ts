import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { UserService } from '@services/user.service';

export const ownerAccessGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const allow = toSignal(userService.hasOwnerPermissions(), { initialValue: false });
  return allow();
};
