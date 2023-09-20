import { Component, inject, OnInit } from '@angular/core';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-thank-for-order',
  templateUrl: './thank-for-order.component.html',
  styleUrls: ['./thank-for-order.component.scss'],
})
export class ThankForOrderComponent implements OnInit {
  private shoppingCartService = inject(ShoppingCartService);
  ngOnInit(): void {
    this.shoppingCartService.clearAll();
  }
}
