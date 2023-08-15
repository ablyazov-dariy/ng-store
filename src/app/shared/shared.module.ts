import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductsRenderContainerComponent } from './products-render-container/products-render-container.component';

@NgModule({
  declarations: [ProductsRenderContainerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    RouterLink,
  ],
  exports: [ProductsRenderContainerComponent],
})
export class SharedModule {}
