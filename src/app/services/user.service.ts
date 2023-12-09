import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // this is an object from firebase
  user?: { permissions: string[] } = { permissions: [''] };

  constructor(private router: Router) {}

  public isAuthenticated() {
    return !!this.user;
  }

  public hasAdminPermissions() {
    return !!this.user?.permissions.includes('admin');
  }

  public hasOwnerPermissions() {
    return !!this.user?.permissions.includes('owner');
  }

  setPermission(permission: string) {
    this.user?.permissions.push(permission);
  }

  removePermission(permission: string) {
    let permissions = this.user?.permissions;
    if (permissions?.includes(permission)) {
      permissions?.splice(permissions.indexOf(permission), 1);
    }
  }

  signIn() {
    this.user = { permissions: [] };
  }

  public signOut() {
    this.user = undefined;
  }
}
