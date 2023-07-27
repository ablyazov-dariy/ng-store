import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.scss'],
})
export class PopupCartComponent {
  isOpen = signal<boolean>(false);

  update() {
    this.isOpen.update(value => !value);
  }
}
