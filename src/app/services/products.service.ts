import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsFilterInterface } from '@interfaces/products-filter.interface';
import { LikeService } from '@services/like.service';
import { combineLatestWith, iif, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private cash: ProductInterface[] = [];

  constructor(private likeService: LikeService, protected angularFirestore: AngularFirestore) {}

  // TODO: convert date string to Date object
  getProductsObservable(params: { [key: string]: any }): Observable<ProductInterface[]> {
    const options: ProductsFilterInterface = {
      id: params['id'],
      searchQuery: params['searchQuery'],
      sortDirection: params['sortDirection'] ?? 'asc',
      startWith: params['startWith'] ?? 0,
      limit: params['limit'] ?? 12,
      newOnly: params['newOnly'] == 'true' ?? false,
      featured: params['featured'] == 'true' ?? false,
      favorite: params['favorite'] == 'true' ?? false,
    };
    return this.getData(options);
  }

  private getData(options: ProductsFilterInterface): Observable<ProductInterface[]> {
    return iif(
      () => this.filter(this.cash, options).length > 0,
      this.getDataFromCash(),
      this.getDataFromFirebase(options)
    ).pipe(
      combineLatestWith(this.likeService.likesMap$),
      map(([productsData, likesData]) => this.mergeFav(productsData, likesData)),
      map(arr => this.filter(arr, options))
    );
  }

  private filter(arr: ProductInterface[], filters: ProductsFilterInterface): ProductInterface[] {
    return arr
      .filter(
        item =>
          (!filters.searchQuery ||
            item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) &&
          (!filters.newOnly || item.new) &&
          (!filters.favorite || item.favorite) &&
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

  private setCash(data: ProductInterface[]) {
    this.cash = this.cash.concat(data).reduce((acc, curr) => {
      !acc.some(el => el.id === curr.id) ? acc.push(curr) : null;
      return acc;
    }, [] as ProductInterface[]);
  }

  private getDataFromCash() {
    return of(this.cash).pipe(tap(_ => console.log('data from CASH')));
  }

  private getDataFromFirebase(options: ProductsFilterInterface): Observable<ProductInterface[]> {
    return this.angularFirestore
      .collection<ProductInterface>('products', ref =>
        ref.limit(options.limit).orderBy('price', options.sortDirection as any)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        tap(_ => console.log('data from Firebase')),
        tap(data => this.setCash(data))
      );
  }
}
