import { Component } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent {
  constructor(private userService: UserService) {}

  get userIsAuthenticated() {
    return this.userService.isAuthenticated();
  }
  get userHasOwnerPermissions() {
    return this.userService.hasOwnerPermissions();
  }
  get userHasAdminPermissions() {
    return this.userService.hasAdminPermissions();
  }

  logout() {
    this.userService.signOut();
  }

  setPermission(permission: string) {
    this.userService.setPermission(permission);
  }
  removePermission(permission: string) {
    this.userService.removePermission(permission);
  }
}
