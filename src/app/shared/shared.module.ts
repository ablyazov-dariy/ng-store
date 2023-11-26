import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CharacterLimitPipe } from '@pipes/character-limit.pipe';

import { ProductsRenderContainerComponent } from '@shared/components/products-render-container/products-render-container.component';
import { ProductsRenderItemComponent } from '@shared/components/products-render-item/products-render-item.component';
import { ManageSearchComponent } from '@shared/manage-search/manage-search.component';
import { DiscountCalculatorPipe } from '@shared/pipes/discount-calculator.pipe';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

import { DuiInputComponent } from './components/dui-input/dui-input.component';
import { ImgInputComponent } from './components/img-input/img-input.component';

@NgModule({
  declarations: [
    ProductsRenderContainerComponent,
    ProductsRenderItemComponent,
    DiscountCalculatorPipe,
    CharacterLimitPipe,
    DuiInputComponent,
    CartIconComponent,
    ManageSearchComponent,
    ImgInputComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CdkMenuModule,
  ],
  exports: [
    ProductsRenderContainerComponent,
    DiscountCalculatorPipe,
    CharacterLimitPipe,
    ProductsRenderItemComponent,
    DuiInputComponent,
    CartIconComponent,
    ManageSearchComponent,
    ImgInputComponent,
  ],
})
export class SharedModule {}
