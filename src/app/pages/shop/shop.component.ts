import { Component, OnDestroy, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsService } from '@services/products.service';
import { SignalService } from '@services/signal.service';

import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  public products$: Observable<ProductInterface[]> = this.productsData();
  public gridSize: Signal<number>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private signalService: SignalService
  ) {
    this.gridSize = signalService.viewGridSizeSignal;
  }

  private productsData(): Observable<ProductInterface[]> {
    return this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.productsService.getProductsObservable(params))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
