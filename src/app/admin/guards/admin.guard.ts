import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';

export const adminGuard: CanMatchFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  return localStorageService.getItem('role') === 'admin';
};
