import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardForm, GroupOne, PayPalForm } from '@interfaces/form-types';
import { CheckoutFormsService } from '@services/checkout-forms.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { combineLatest, debounceTime, map, merge, mergeMap, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  groupOne$: Observable<GroupOne> = this.checkoutFormsService.createGroupOne();
  addressForm: FormGroup = this.checkoutFormsService.createAddressForm();
  paypalForm: PayPalForm = this.checkoutFormsService.createPaypalForm();
  cardForm: CreditCardForm = this.checkoutFormsService.createCreditCardForm();

  payStepControl = new FormControl('false', Validators.pattern(/^(true)$/i));

  constructor(
    private checkoutFormsService: CheckoutFormsService,
    private cartService: ShoppingCartService
  ) {}

  get cartData$() {
    return this.cartService.data$;
  }

  ngOnInit(): void {
    this.controlPayStepValidation();
    this.finalize();
  }

  private controlPayStepValidation() {
    merge(this.paypalForm.statusChanges, this.cardForm.statusChanges)
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (value === 'VALID') this.payStepControl.setValue('true');
        else this.payStepControl.setValue('false');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  finalize() {
    const observables = {
      data: this.groupOne$.pipe(mergeMap(value => value.valueChanges)),
      address: this.addressForm.valueChanges,
      payInfo: merge(this.paypalForm.valueChanges, this.cardForm.valueChanges),
    };
    combineLatest(observables)
      .pipe(
        map(value => {
          // do something with data
          return value;
        })
      )
      .subscribe(value => console.log(value));
  }
}
