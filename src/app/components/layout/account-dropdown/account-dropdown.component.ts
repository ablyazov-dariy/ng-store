import { Component } from '@angular/core';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent {
  constructor(private userService: UserService) {}

  get userIsAuthenticated(): Observable<boolean> {
    return this.userService.isAuthenticated();
  }
  get userHasOwnerPermissions() {
    return this.userService.hasOwnerPermissions().pipe(shareReplay(2));
  }
  get userHasAdminPermissions() {
    return this.userService.hasAdminPermissions().pipe(shareReplay(2));
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
