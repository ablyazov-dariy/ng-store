import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-shipping-add',
  templateUrl: './shipping-add.component.html',
  styleUrls: ['./shipping-add.component.scss'],
})
export class ShippingAddComponent {
  private host: ElementRef<HTMLElement> = inject(ElementRef);
  selfDestroy() {
    this.host.nativeElement.remove();
  }
}
