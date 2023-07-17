import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductComponent } from 'app/pages/product/product.component';

import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
