import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
  styleUrls: ['./recovery-form.component.scss'],
})
export class RecoveryFormComponent {
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public sent: boolean = false;
  constructor(private authService: AuthService) {}

  public onSubmit(): void {
    if (this.emailControl.valid) {
      this.authService
        .sendPasswordResetEmail(this.emailControl.value!)
        .pipe(retry({ count: 3, delay: 3000 }))
        .subscribe(() => (this.sent = true));
    }
  }
}
