import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CharacterLimitPipe } from '@pipes/character-limit.pipe';
import { ProductsRenderContainerComponent } from '@shared/components/products-render-container/products-render-container.component';
import { ProductsRenderItemComponent } from '@shared/components/products-render-item/products-render-item.component';
import { DiscountCalculatorPipe } from '@shared/pipes/discount-calculator.pipe';

@NgModule({
  declarations: [
    ProductsRenderContainerComponent,
    ProductsRenderItemComponent,
    DiscountCalculatorPipe,
    CharacterLimitPipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    RouterLink,
  ],
  exports: [
    ProductsRenderContainerComponent,
    DiscountCalculatorPipe,
    CharacterLimitPipe,
    ProductsRenderItemComponent,
  ],
})
export class SharedModule {}
