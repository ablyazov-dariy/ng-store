import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  groupOne$: any;
  addressForm: any;

  constructor(private formBuilder: FormBuilder, private cartService: ShoppingCartService) {}
  get cartData$() {
    return this.cartService.data$;
  }

  ngOnInit(): void {
    this.groupOne$ = this.createGroupOne();
    this.addressForm = this.createAddressForm();
  }

  // do I need to create interfaces for nested generics ?
  private createGroupOne(): Observable<
    FormGroup<{
      colors: FormArray<FormControl<string | null>>;
      sizes: FormArray<FormControl<string | null>>;
    }>
  > {
    return this.cartService.data$.pipe(
      takeUntil(this.destroy$),
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
  private createAddressForm() {
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
