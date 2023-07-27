import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() product?: ProductInterface;
  @Output() count$ = new EventEmitter<number>();

  changeEffect = effect(() => {
    console.log(this.count());
  });

  public count = signal<number>(1);

  public increaseCount(event: MouseEvent): void {
    event.stopPropagation();
    this.count.update(count => ++count);
    console.log(this.count());
  }

  public decreaseCount(event: MouseEvent): void {
    event.stopPropagation();
    this.count.update(count => --count);
  }

  public remove(event: MouseEvent): void {
    event.stopPropagation();
    this.count.update(count => 0);
  }
}
