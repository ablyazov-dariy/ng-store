import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AccessLevel } from '@app/enums/access-level';
import { UserService } from '@services/user.service';

export const accessGuard = (requiredLevel: AccessLevel): CanMatchFn => {
  return (route, state) => {
    const user = inject(UserService);
    return user.roleLevel >= requiredLevel;
  };
};
