import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductsFilterInterface } from '@interfaces/products-filter.interface';
import { LikeService } from '@services/like.service';
import { combineLatestWith, from, iif, map, Observable, of, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private cash: ProductInterface[] = [];

  constructor(private likeService: LikeService, private angularFirestore: AngularFirestore) {}

  public getProductById$(id: string) {
    return this.angularFirestore.doc<ProductInterface>('products/' + id).get();
  }

  getProducts$(params: { [key: string]: any }): Observable<ProductInterface[]> {
    const options: ProductsFilterInterface = {
      id: params['id'],
      searchQuery: params['searchQuery'],
      sortDirection: params['sortDirection'] ?? 'asc',
      startWith: params['startWith'] ?? 0,
      limit: params['limit'] ?? 12,
      newOnly: params['newOnly'] == 'true',
      featured: params['featured'] == 'true',
      favorite: params['favorite'] == 'true',
      noCash: params['noCash'] == 'true',
    };
    return this.getData(options).pipe(tap(console.log));
  }

  private getData(options: ProductsFilterInterface): Observable<ProductInterface[]> {
    return iif(
      () => this.filter(this.cash, options).length < options.limit || options.noCash,
      this.getDataFromFirebase(options),
      this.getDataFromCash()
    ).pipe(
      combineLatestWith(this.likeService.likesMap$),
      map(([productsData, likesData]) => this.mergeFav(productsData, likesData)),
      map(arr => this.filter(arr, options)),
      share()
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
    const mergedArray = [...data];

    this.cash.forEach(cashedProduct =>
      !mergedArray.find(serverProduct => serverProduct.id === cashedProduct.id)
        ? mergedArray.push(cashedProduct)
        : null
    );

    this.cash = mergedArray;
  }

  private getDataFromCash() {
    return of(this.cash).pipe(tap(_ => console.log('data from CASH')));
  }

  private getDataFromFirebase(options: ProductsFilterInterface): Observable<ProductInterface[]> {
    return this.angularFirestore
      .collection<ProductInterface>('products', ref =>
        ref.orderBy('price', options.sortDirection as any).limit(options.limit)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        tap(_ => console.log('data from Firebase')),
        tap(data => this.setCash(data))
      );
  }

  createNewProduct(product: Omit<ProductInterface, 'id'>) {
    return from(
      this.angularFirestore.collection<Omit<ProductInterface, 'id'>>('products').add({ ...product })
    );
  }

  updateProduct(id: string, product: Omit<ProductInterface, 'id'>) {
    return from(
      this.angularFirestore
        .collection<ProductInterface>('products')
        .doc(id)
        .update({ ...product })
    );
  }

  deleteProduct(id: string) {
    return from(
      this.angularFirestore.collection<ProductInterface>('products').doc(id).delete()
    ).pipe(
      tap(() =>
        this.cash.splice(
          this.cash.findIndex(item => item.id === id),
          1
        )
      )
    );
  }
}
