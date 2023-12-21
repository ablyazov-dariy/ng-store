import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserDataInterface } from '@interfaces/user-data.interface';
import { Observable, switchMap } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$ = user(this.auth);

  public userData$: Observable<UserDataInterface | undefined> = this.createUserData();

  private isAuthenticated$?: Observable<boolean>;
  private userPermissions$?: Observable<string[] | undefined>;

  constructor(
    private router: Router,
    private auth: Auth,
    private angularFirestore: AngularFirestore
  ) {}

  public isAuthenticated(): Observable<boolean> {
    if (!this.isAuthenticated$) {
      this.isAuthenticated$ = this.user$.pipe(
        map(value => !!value),
        shareReplay(2)
      );
    }
    return this.isAuthenticated$;
  }

  private createUserData(): Observable<UserDataInterface | undefined> {
    return this.user$.pipe(
      switchMap(user =>
        this.angularFirestore.doc<UserDataInterface>('users/' + user?.uid).valueChanges()
      ),
      shareReplay(2)
    );
  }

  public hasAdminPermissions(): Observable<boolean> {
    if (!this.userPermissions$) {
      this.userPermissions$ = this.userData$.pipe(map(value => value?.permissions));
    }
    return this.userPermissions$.pipe(map(value => value?.includes('admin') ?? false));
  }

  public hasOwnerPermissions(): Observable<boolean> {
    if (!this.userPermissions$) {
      this.userPermissions$ = this.userData$.pipe(map(value => value?.permissions));
    }
    return this.userPermissions$.pipe(map(value => value?.includes('owner') ?? false));
  }

  public signOut(): void {
    this.auth.signOut().then(() => this.router.navigateByUrl('/'));
  }

  public updateUserData(data: Partial<UserDataInterface>) {
    this.angularFirestore
      .doc<UserDataInterface>('users/' + this.auth.currentUser?.uid)
      .update(data);
  }
}
