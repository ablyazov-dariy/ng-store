import { FormArray, FormControl, FormGroup } from '@angular/forms';
// TODO: rename to something more sensible
export type GroupOne = FormGroup<{
  colors: FormArray<FormControl<string | null>>;
  sizes: FormArray<FormControl<string | null>>;
}>;

export type CreditCardForm = FormGroup<{
  cardName: FormControl;
  cardNumber: FormControl;
  expiryDate: FormControl;
  cvv: FormControl;
}>;

export type PaymentMethod = 'card' | 'paypal' | 'g-pay';

export type PayPalForm = FormGroup<{
  paypalEmail: FormControl;
  paypalPassword: FormControl;
}>;
