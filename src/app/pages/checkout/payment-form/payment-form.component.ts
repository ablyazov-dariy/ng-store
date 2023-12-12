import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { CreditCardForm, PaymentMethod, PayPalForm } from '@interfaces/form-types';
import { debounceTime, Observable, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  animations: [
    trigger('cardRotate', [
      state(
        'face',
        style({
          rotate: 'y 0deg',
        })
      ),
      state(
        'back',
        style({
          rotate: 'y 180deg',
        })
      ),
      transition('face => back', [animate('1s')]),
      transition('back => face', [animate('1s')]),
    ]),
  ],
})
export class PaymentFormComponent implements OnInit {
  @Input({ required: true }) paypalForm!: PayPalForm;
  @Input({ required: true }) creditCardForm!: CreditCardForm;
  private destroyRef = inject(DestroyRef);
  pmControl = new FormControl<PaymentMethod>('card');
  isBack = false;

  get pmValueChanges(): Observable<PaymentMethod | null> {
    return this.pmControl.valueChanges.pipe(startWith(this.pmControl.value));
  }

  get cardNumberControl() {
    return this.creditCardForm.controls.cardNumber.valueChanges.pipe(
      startWith(this.creditCardForm.controls.cardNumber.value)
    );
  }
  get cvvControl() {
    return this.creditCardForm.controls.cvv.valueChanges.pipe(
      startWith(this.creditCardForm.controls.cvv.value)
    );
  }
  get nameControl() {
    return this.creditCardForm.controls.cardName.valueChanges.pipe(
      startWith(this.creditCardForm.controls.cardName.value)
    );
  }
  get expiryControl() {
    return this.creditCardForm.controls.expiryDate.valueChanges.pipe(
      startWith(this.creditCardForm.controls.expiryDate.value)
    );
  }

  ngOnInit(): void {
    this.rotateObserve();
  }

  private rotateObserve(): void {
    this.creditCardForm.controls.cvv.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => (this.isBack = true)),
        debounceTime(3000)
      )
      .subscribe(() => {
        this.isBack = false;
      });
  }
}
