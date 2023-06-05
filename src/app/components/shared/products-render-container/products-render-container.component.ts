import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-products-render-container',
  templateUrl: './products-render-container.component.html',
  styleUrls: ['./products-render-container.component.scss'],
})
export class ProductsRenderContainerComponent {
  @Input() cols: number = 4;
  @Input({ required: true }) products!: Product[] | Product[];
}
