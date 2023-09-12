import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { PaymentFormComponent } from '@pages/checkout/payment-form/payment-form.component';
import { SharedModule } from '@shared/shared.module';

import { CheckoutRoutingModule } from 'app/pages/checkout/checkout-routing.module';
import { CheckoutComponent } from 'app/pages/checkout/checkout.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { ConfirmCartComponent } from './confirm-cart/confirm-cart.component';
import { PaypalFormComponent } from './payment-form/paypal-form/paypal-form.component';
import { CardFormComponent } from './payment-form/card-form/card-form.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    ConfirmCartComponent,
    AddressFormComponent,
    PaymentFormComponent,
    PaypalFormComponent,
    CardFormComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    SharedModule,
    MatDatepickerModule,
  ],
})
export class CheckoutModule {}
