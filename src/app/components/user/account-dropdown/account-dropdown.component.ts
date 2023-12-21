import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent {
  userIsAuthenticated = toSignal<boolean>(this.userService.isAuthenticated());
  userHasOwnerPermissions = toSignal<boolean>(this.userService.hasOwnerPermissions());
  userHasAdminPermissions = toSignal<boolean>(this.userService.hasAdminPermissions());
  userData = toSignal(this.userService.userData$);
  user = toSignal(this.userService.user$);

  constructor(private userService: UserService, private authService: AuthService) {}

  public logout(): void {
    this.userService.signOut();
  }
}
