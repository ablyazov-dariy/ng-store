import { Component, Input } from '@angular/core';
import { PayPalForm } from '@interfaces/form-types';

@Component({
  selector: 'app-paypal-form',
  templateUrl: './paypal-form.component.html',
  styleUrls: ['./paypal-form.component.scss'],
})
export class PaypalFormComponent {
  @Input({ required: true }) paypalForm!: PayPalForm;
  hidePassword = true;
}
