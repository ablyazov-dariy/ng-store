import { Component, inject, Input } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  private cart = inject(ShoppingCartService);
  @Input({ required: true }) item!: ProductInterface & { __count: number };

  remove() {
    this.cart
      .removeItemOrDecrementCount(this.item.id)
      .then(s => console.log(s))
      .catch(error => console.log(error));
  }

  add() {
    this.cart.addToCartOrIncrementCount(this.item);
  }

  delete() {
    this.item.__count = -1;
    this.cart
      .removeItemOrDecrementCount(this.item.id)
      .then(s => console.log(s))
      .catch(error => console.log(error));
  }
}
