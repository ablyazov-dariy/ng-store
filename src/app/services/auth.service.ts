import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthDialogComponent } from '@components/user/auth-dialog/auth-dialog.component';
import { UserDataInterface } from '@interfaces/user-data.interface';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dialogRef?: DialogRef<UserCredential>;
  constructor(
    private auth: Auth,
    private dialog: Dialog,
    private angularFirestore: AngularFirestore
  ) {}

  public loginWithGoogle(): Observable<void> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap(user => this.createUserData(user))
    );
  }

  public signInWithEmailAndPassword(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(user => this.createUserData(user))
    );
  }

  public createUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(user => this.createUserData(user, name))
    );
  }

  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  public closeAuthDialog(): void {
    this.dialogRef?.close();
  }

  private createUserData(user: UserCredential, name?: string): Observable<void> {
    const data = name
      ? { uid: user.user.uid, name: user.user.displayName ?? name }
      : { uid: user.user.uid };
    return from(
      this.angularFirestore
        .collection<UserDataInterface>('users')
        .doc(user.user.uid)
        .set(data, { merge: true })
    );
  }

  public openAuthDialog(): void {
    if (this.dialog.openDialogs.length <= 0) {
      this.dialogRef = this.dialog.open<UserCredential>(AuthDialogComponent, {
        width: '100%',
        maxWidth: '45ch',
      });
    }
  }
}
