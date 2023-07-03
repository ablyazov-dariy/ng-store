import { Component, computed, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { FilterStateService } from '@services/filter-state.service';
import { ProductsDataService } from '@services/products-data.service';

import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  private products = signal<ProductInterface[]>([]);

  constructor(
    private productsDataService: ProductsDataService,
    private filterService: FilterStateService
  ) {}

  ngOnInit(): void {
    this.filterProducts();
  }

  filterProducts() {
    this.productsDataService
      .getJsonData()
      .pipe(
        takeUntil(this.destroy$),
        filter(
          data => true
          // add filter logic here
        )
      )
      .subscribe(data => this.products.set(data));
  }

  getSortedProducts(): Signal<ProductInterface[]> {
    return computed(() =>
      this.products().sort((a, b) =>
        this.filterService.sortDirection() === 'asc' ? a.price - b.price : b.price - a.price
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
