import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { GroupOne } from '@interfaces/form-types';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { distinctUntilChanged, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormsService {
  constructor(private formBuilder: FormBuilder, private cartService: ShoppingCartService) {}

  createGroupOne(): Observable<GroupOne> {
    return this.cartService.data$.pipe(
      distinctUntilChanged((previous, current) => previous.length === current.length),
      map(value =>
        this.formBuilder.group({
          colors: this.formBuilder.array(value.map(() => new FormControl('', Validators.required))),
          sizes: this.formBuilder.array(value.map(() => new FormControl('', Validators.required))),
        })
      ),
      shareReplay()
    );
  }
  createAddressForm() {
    return this.formBuilder.group({
      company: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      postalCode: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      ],
      shipping: ['free', Validators.required],
    });
  }

  createCreditCardForm() {
    return this.formBuilder.group({
      cardName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
      expiryDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
      ]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
    });
  }

  createPaypalForm() {
    return this.formBuilder.group({
      paypalEmail: ['', [Validators.required, Validators.email]],
      paypalPassword: ['', [Validators.required]],
    });
  }

  myValidator(observable: Observable<boolean>): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return observable.pipe(
        map(isValid => {
          if (!isValid) {
            return {
              massage: 'massage',
            };
          }
          return null;
        })
      );
    };
  }
}
