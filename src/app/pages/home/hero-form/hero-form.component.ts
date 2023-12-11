import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { UserInterface } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';
import { combineLatestWith, filter, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  // this component will be removed, its just to add roles for now

  private signIn = new Subject<void>();
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  get auth() {
    return this.userService.isAuthenticated();
  }

  onSignInClicked() {
    this.signIn.next();
    const testUser: UserInterface = { permissions: [] };
    this.userService.signIn(testUser);
  }

  form = this.fb.group({
    email: ['', [Validators.email]],
    role: ['', [this.roleValidator]],
  });

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.form.valid),
        map(value => value.role),
        combineLatestWith(this.signIn)
      )
      .subscribe(([value, _]) => {
        this.userService.signIn({ permissions: value?.split(' ') ?? [] });
      });
  }
  roleValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    let roles = control.value
      .toLowerCase()
      .split(' ')
      .map((role: string) => role.trim());

    let valid = roles.includes('admin') || roles.includes('owner');
    return valid ? null : { invalidRole: true };
  }
}
