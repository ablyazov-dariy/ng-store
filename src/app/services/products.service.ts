import { Injectable, OnDestroy } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsFilterInterface } from '@interfaces/products-filter.interface';
import { APIService } from '@services/api.service';
import { combineLatest, Observable, of, scan, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnDestroy {
  private destroy$ = new Subject<boolean>();

  constructor(private api: APIService) {}

  getProductsObservable(params: { [key: string]: any }): Observable<ProductInterface[]> {
    // TODO: change to data src
    let temp$: Observable<Map<number, true>> = of(new Map());

    const options: ProductsFilterInterface = {
      searchQuery: params['searchQuery'] ?? '',
      sortDirection: params['sortDirection'] ?? 'asc',
      startWith: params['startWith'] ?? 0,
      limit: params['limit'] ?? 12,
      newOnly: params['newOnly'] ?? false,
    };
    const url = 'assets/data.json';
    const apiProductsData$ = this.api.get(url).pipe(
      map(data => data as ProductInterface[]),
      scan((acc, value) => [...acc, ...value]),
      map(arr => this.filter(arr, options))
    );
    return combineLatest([apiProductsData$, temp$]).pipe(
      takeUntil(this.destroy$),
      map(([productsData, likesData]) => this.mergeFav(productsData, likesData))
    );
  }

  private filter(arr: ProductInterface[], filters: ProductsFilterInterface): ProductInterface[] {
    return arr
      .filter(
        item =>
          (!filters.searchQuery ||
            item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
          (!filters.newOnly || item.new)
      )
      .sort((a, b) => (filters.sortDirection === 'desc' ? b.price - a.price : a.price - b.price))
      .slice(filters.startWith, filters.startWith + filters.limit);
  }

  private mergeFav(prodData: ProductInterface[], likesMap: Map<number, true>) {
    return prodData.map(product => {
      product.favorite = likesMap.has(product.id);
      return product;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
