import { Component, inject, Input } from '@angular/core';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';

import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  private cartService = inject(ShoppingCartService);
  @Input({ required: true }) item!: ProductWithCountInterface;

  decrement() {
    this.cartService.decrement(this.item.id);
  }

  increment() {
    this.cartService.increment(this.item);
  }

  delete() {
    this.cartService.remove(this.item.id);
  }
}
