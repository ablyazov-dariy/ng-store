import { Injectable } from '@angular/core';
import { AccessLevel } from '@app/enums/access-level';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private role: AccessLevel = AccessLevel.unknown;

  constructor() {}

  get roleLevel(): number {
    return this.role;
  }

  set roleLevel(role: AccessLevel) {
    this.role = role;
  }

  public signOut() {
    this.role = AccessLevel.unknown;
  }
}
