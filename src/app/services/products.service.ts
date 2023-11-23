import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsFilterInterface } from '@interfaces/products-filter.interface';
import { APIService } from '@services/api.service';
import { LikeService } from '@services/like.service';
import { combineLatest, Observable, scan } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private api: APIService, private likeService: LikeService) {}
  firestore: Firestore = inject(Firestore);

  test() {
    collectionData(collection(this.firestore, 'products'), { idField: 'id' }).subscribe(
      console.log
    );
  }
  // TODO: create interface for params
  // TODO: convert date string to Date object
  // TODO: pagination or infinite scroll
  getProductsObservable(params: { [key: string]: any }): Observable<ProductInterface[]> {
    const options: ProductsFilterInterface = {
      id: params['id'] ?? undefined,
      searchQuery: params['searchQuery'] ?? '',
      sortDirection: params['sortDirection'] ?? 'asc',
      startWith: params['startWith'] ?? 0,
      limit: params['limit'] ?? 12,
      // js moment string "false" is true (not empty string) 🤦‍♂️🤦‍♂️🤦‍♂️
      newOnly: params['newOnly'] == 'true' ?? false,
      featured: params['featured'] == 'true' ?? false,
      favorite: params['favorite'] == 'true' ?? false,
    };
    const url = 'assets/data.json';
    const apiProductsData$ = this.api.get(url).pipe(
      map(data => data as ProductInterface[]),
      scan((acc, value) => [...acc, ...value]),
      map(arr => this.filter(arr, options))
    );
    return combineLatest([apiProductsData$, this.likeService.likesMap$]).pipe(
      map(([productsData, likesData]) => this.mergeFav(productsData, likesData)),
      map(data => (params['favorite'] ? data.filter(item => item.favorite) : data))
    );
  }

  private filter(arr: ProductInterface[], filters: ProductsFilterInterface): ProductInterface[] {
    return arr
      .filter(
        item =>
          (!filters.searchQuery ||
            item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
          (!filters.newOnly || item.new) &&
          (!filters.featured || item.featured) &&
          (!filters.id || item.id === filters.id)
      )
      .sort((a, b) => (filters.sortDirection === 'desc' ? b.price - a.price : a.price - b.price))
      .slice(filters.startWith, filters.startWith + filters.limit);
  }

  private mergeFav(prodData: ProductInterface[], likesMap: Map<string, boolean>) {
    return prodData.map(product => {
      product.favorite = likesMap.get(product.id);
      return product;
    });
  }
}
