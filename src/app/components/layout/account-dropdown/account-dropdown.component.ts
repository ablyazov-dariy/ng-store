import { Component } from '@angular/core';
import { AccessLevel } from '@app/enums/access-level';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss'],
})
export class AccountDropdownComponent {
  constructor(private userService: UserService) {}

  get userLevel() {
    return this.userService.roleLevel;
  }

  logout() {
    this.userService.signOut();
  }

  setRole(level: AccessLevel) {
    this.userService.roleLevel = level;
  }
}
