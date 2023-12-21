import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const authDialogResolver: ResolveFn<void> = (route, state) => {
  const authService = inject(AuthService);
  authService.openAuthDialog();
};
