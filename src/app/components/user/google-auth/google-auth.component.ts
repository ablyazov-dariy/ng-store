import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  onAuth(): void {
    this.authService
      .loginWithGoogle()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.authService.closeAuthDialog();
      });
  }
}
