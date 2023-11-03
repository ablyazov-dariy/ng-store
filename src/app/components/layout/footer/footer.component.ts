import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  newsletterForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      console.log('subscribed to newsletter' + this.newsletterForm.value);
    }
    asyncScheduler.schedule(this.resetForm.bind(this), 5000);
  }

  private resetForm() {
    this.newsletterForm.reset();
  }
}
