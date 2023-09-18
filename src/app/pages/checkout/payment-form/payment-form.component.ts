import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreditCardForm, PaymentMethod, PayPalForm } from '@interfaces/form-types';
import { debounceTime, Observable, startWith, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class PaymentFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) paypalForm!: PayPalForm;
  @Input({ required: true }) creditCardForm!: CreditCardForm;
  private destroy$ = new Subject();
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
        takeUntil(this.destroy$),
        tap(() => (this.isBack = true)),
        debounceTime(3000)
      )
      .subscribe(() => {
        this.isBack = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  protected readonly startWith = startWith;
}
