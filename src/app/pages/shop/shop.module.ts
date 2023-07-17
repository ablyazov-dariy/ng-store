import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';

import { SharedModule } from '@shared/shared.module';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ViewControllerComponent } from './view-controller/view-controller.component';

@NgModule({
  declarations: [ShopComponent, ViewControllerComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [],
})
export class ShopModule {}
