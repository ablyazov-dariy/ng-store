import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardForm, GroupOne, PayPalForm } from '@interfaces/form-types';
import { CheckoutFormsService } from '@pages/checkout/checkout-forms.service';
import { ShoppingCartService } from '@services/shopping-cart.service';

import { combineLatest, debounceTime, map, merge, Observable, Subject, switchMap, tap } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

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
  addressAsString$ = this.getAddressAsString$();
  productsForTable$ = this.getProductsForTable$();

  constructor(
    private checkoutFormsService: CheckoutFormsService,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}

  get cartData$() {
    return this.cartService.data$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        // this will redirect user if cart is empty
        if (data.length <= 0) this.router.navigateByUrl('').then();
      })
    );
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

  finalize() {}

  getAddressAsString$() {
    return this.addressForm.valueChanges.pipe(
      map(value => {
        return `${value.address}, shipping: ${value.shipping}`;
      }),
      shareReplay(1)
    );
  }
  getProductsForTable$() {
    return combineLatest(
      this.cartData$,
      this.groupOne$.pipe(switchMap(value => value.valueChanges))
    ).pipe(
      takeUntil(this.destroy$),
      map(([cartData, formData]) => {
        return cartData.map((product, i) => {
          return {
            id: product.id,
            name: product.name,
            color: formData.colors?.at(i) ?? '',
            size: formData.sizes?.at(i) ?? '',
          };
        });
      }),
      shareReplay(1)
    );
  }
}
