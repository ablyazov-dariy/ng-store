import { Component } from '@angular/core';
import { CollectionInterface } from '@interfaces/collection.interface';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsService } from '@services/products.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public products$: Observable<ProductInterface[]> = this.productsData();
  // // TODO: get collections from server
  // this will be removed
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
    return this.productsService.getProducts$({
      limit: 4,
      newOnly: true,
    });
  }
}
