import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { catchError, filter, map, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  public firebaseError = signal<string | null>(null);
  public signupForm = this.buildForm();
  public submit = new Subject();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  get nameControl() {
    return this.signupForm.controls.name;
  }

  get emailControl() {
    return this.signupForm.controls.email;
  }

  get passwordControl() {
    return this.signupForm.controls.password;
  }

  ngOnInit(): void {
    this.createUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.firebaseError.set(null);
        this.authService.closeAuthDialog();
      });
  }

  private createUser(): Observable<void> {
    return of('of').pipe(
      switchMap(() => this.submit),
      filter(() => this.signupForm.valid),
      map(() => this.signupForm.value),
      switchMap(data =>
        this.authService.createUserWithEmailAndPassword(data.email!, data.password!, data.name!)
      ),
      catchError((err, caught) => {
        this.firebaseError.set(err);
        return this.createUser();
      })
    );
  }

  private buildForm(): FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> {
    return this.fb.group({
      name: ['', [Validators.min(1), Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
        ],
      ],
    });
  }
}
