import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CreditCardForm, GroupOne, PayPalForm } from '@interfaces/form-types';
import { CheckoutFormsService } from '@services/checkout-forms.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { merge, Observable, of, Subject } from 'rxjs';

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

  thirdStepControl: AbstractControl;

  constructor(
    private checkoutFormsService: CheckoutFormsService,
    private cartService: ShoppingCartService
  ) {
    const my = merge();

    this.thirdStepControl = new FormControl(
      '',
      [this.checkoutFormsService.myValidator(of(true))],
      []
    );
  }

  get cartData$() {
    return this.cartService.data$;
  }

  ngOnInit(): void {
    this.finalize();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  finalize() {}
}
