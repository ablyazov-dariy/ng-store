import { Component, Input } from '@angular/core';
import { CreditCardForm } from '@interfaces/form-types';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent {
  @Input({ required: true }) creditCardForm!: CreditCardForm;
}
