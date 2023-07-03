import { Component, inject, OnDestroy } from '@angular/core';

import { CollectionInterface } from '@interfaces/collection.interface';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsDataService } from '@services/products-data.service';

import { Observable, Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private ProductsDataService: ProductsDataService = inject(ProductsDataService);
  private destroy$: Subject<boolean> = new Subject();
  public featuredProducts$: Observable<ProductInterface[]> = this.getFeaturedProducts();

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

  private getFeaturedProducts(): Observable<ProductInterface[]> {
    return this.ProductsDataService.getJsonData().pipe(
      takeUntil(this.destroy$),
      map(products => products.filter(product => product.featured).slice(0, 4))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
