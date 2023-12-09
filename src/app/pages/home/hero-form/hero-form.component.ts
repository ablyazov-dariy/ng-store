import { Component, inject } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent {
  userService = inject(UserService);
}
