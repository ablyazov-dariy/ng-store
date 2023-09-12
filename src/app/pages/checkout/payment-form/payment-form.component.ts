import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreditCardForm, PaymentMethod, PayPalForm } from '@interfaces/form-types';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  @Input({ required: true }) paypalForm!: PayPalForm;
  @Input({ required: true }) creditCardForm!: CreditCardForm;
  pmControl = new FormControl<PaymentMethod>('card');

  get pmValueChanges(): Observable<PaymentMethod> {
    return this.pmControl.valueChanges.pipe(startWith(this.pmControl.value)) as any;
  }

  ngOnInit(): void {}
}
