import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsRenderContainerComponent } from './products-render-container/products-render-container.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [ProductsRenderContainerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  exports: [ProductsRenderContainerComponent],
})
export class SharedModule {}
