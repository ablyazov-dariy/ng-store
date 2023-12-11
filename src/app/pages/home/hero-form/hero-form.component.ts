import { Component, inject } from '@angular/core';
import { UserInterface } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {
  private userService = inject(UserService);

  signIn() {
    const testUser: UserInterface = { permissions: [] };
    this.userService.signIn(testUser);
  }
}
