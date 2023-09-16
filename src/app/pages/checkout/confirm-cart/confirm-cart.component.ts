import { Component, ContentChild, inject, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatStepperNext } from '@angular/material/stepper';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: 'confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss'],
})
export class ConfirmCartComponent {
  @ContentChild(MatStepperNext, { static: false }) nextBtn?: MatStepperNext;
  @Input({ required: true, alias: 'confProdData' })
  productsInCartData: ProductWithCountInterface[] | undefined;
  @Input({ required: true }) formGroup?: FormGroup<{
    colors: FormArray<FormControl>;
    sizes: FormArray<FormControl>;
  }>;

  cartService = inject(ShoppingCartService);

  get sizesControls() {
    return this.formGroup?.controls.sizes.controls;
  }
  get colorControls() {
    return this.formGroup?.controls.colors.controls;
  }

  decrement(id: number) {
    this.cartService.decrement(id);
  }

  increment(prod: ProductWithCountInterface) {
    this.cartService.increment(prod);
  }

  delete(id: number, index: number) {
    this.cartService.remove(id);
  }
}
