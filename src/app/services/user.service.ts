import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '@interfaces/user.interface';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<UserInterface | undefined>(undefined);

  constructor(private router: Router, private route: ActivatedRoute) {}

  public isAuthenticated() {
    return this.user$.pipe(map(value => !!value));
  }

  public permissionsChanges() {
    return this.user$.pipe(
      map(value => value?.permissions),
      distinctUntilChanged((previous, current) => previous?.toString() === current?.toString())
    );
  }

  public hasAdminPermissions(): Observable<boolean> {
    return this.user$.pipe(map(value => value?.permissions.includes('admin') ?? false));
  }

  public hasOwnerPermissions(): Observable<boolean> {
    return this.user$.pipe(map(value => value?.permissions.includes('owner') ?? false));
  }

  setPermission(permission: string) {
    if (!this.user$.value) return;
    const permissions = [...this.user$.value.permissions, permission];
    const user = {
      ...this.user$.value,
      permissions: permissions,
    };
    this.user$.next(user);
  }

  removePermission(permission: string) {
    if (!this.user$.value) return;
    const permissionIndex = this.user$.value.permissions.indexOf(permission);

    if (permissionIndex !== -1) {
      // @ts-ignore
      const permissions = this.user$.value.permissions.toSpliced(permissionIndex, 1);

      const user = {
        ...this.user$.value,
        permissions: permissions,
      };
      this.user$.next(user);
    }
  }

  signIn(user: UserInterface) {
    if (!this.user$.value) {
      this.user$.next(user);
    }
  }

  public signOut() {
    if (this.user$.value) {
      this.user$.next(undefined);
      this.router.navigateByUrl('').then();
    }
  }
}
