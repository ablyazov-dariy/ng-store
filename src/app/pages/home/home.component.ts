import { Component, OnDestroy } from '@angular/core';
import { CollectionInterface } from '@interfaces/collection.interface';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsService } from '@services/products.service';

import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  public products$: Observable<ProductInterface[]> = this.productsData();
  // // TODO: get collections from server
  collections: CollectionInterface[] = [
    {
      name: 'Best Sellers',
      img: 'assets/image.png',
      contain: 'best-sellers',
    },
    {
      name: 'All Over Velvet',
      img: 'assets/image (4).png',
      contain: 'velvet',
    },
  ];

  constructor(private productsService: ProductsService) {}

  private productsData(): Observable<ProductInterface[]> {
    return of({
      limit: 4,
      newOnly: true,
    }).pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.productsService.getProductsObservable(params))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
