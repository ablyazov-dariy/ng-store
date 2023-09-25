import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankForOrderRoutingModule } from './thank-for-order-routing.module';
import { ThankForOrderComponent } from './thank-for-order.component';


@NgModule({
  declarations: [
    ThankForOrderComponent
  ],
  imports: [
    CommonModule,
    ThankForOrderRoutingModule
  ]
})
export class ThankForOrderModule { }
