import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { catchError, filter, map, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public firebaseError = signal<string | null>(null);
  public loginForm = this.buildForm();
  public submit = new Subject();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
    this.login()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.firebaseError.set(null);
        this.authService.closeAuthDialog();
      });
  }

  private login(): Observable<void> {
    return of('of').pipe(
      switchMap(() => this.submit),
      filter(() => this.loginForm.valid),
      map(() => this.loginForm.value),
      switchMap(data => this.authService.signInWithEmailAndPassword(data.email!, data.password!)),
      catchError((err, caught) => {
        this.firebaseError.set(err);
        return this.login();
      })
    );
  }

  private buildForm(): FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    remember: FormControl<boolean | null>;
  }> {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }
}
