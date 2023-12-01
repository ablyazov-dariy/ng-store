import { Component, DestroyRef, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsService } from '@services/products.service';
import { SignalService } from '@services/signal.service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  public products$: Observable<ProductInterface[]> = this.productsData();
  public gridSize: Signal<number>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private signalService: SignalService,
    private destroyRef: DestroyRef
  ) {
    this.gridSize = signalService.viewGridSizeSignal;
  }

  private productsData(): Observable<ProductInterface[]> {
    return this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => this.productsService.getProducts$(params))
    );
  }
}
