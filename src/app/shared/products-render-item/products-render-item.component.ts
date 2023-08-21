import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';

@Component({
  selector: 'app-products-render-item',
  templateUrl: './products-render-item.component.html',
  styleUrls: ['./products-render-item.component.scss'],
})
export class ProductsRenderItemComponent {
  @Input({ required: true }) product?: ProductInterface;
  @Output() cartProductEvent: EventEmitter<ProductInterface> = new EventEmitter();
  @Output() likeProductEvent: EventEmitter<{ id: number; like: boolean }> = new EventEmitter();

  addToCart() {
    this.cartProductEvent.emit(this.product);
  }

  like() {
    if (!this.product) return;
    if (this.product?.favorite) {
      this.likeProductEvent.emit({ id: this.product.id, like: false });
    } else this.likeProductEvent.emit({ id: this.product.id, like: true });
  }
}
