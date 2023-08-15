import { Injectable } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { Observable, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private data: (ProductInterface & { __count: number })[] = [];
  private data$: Subject<(ProductInterface & { __count: number })[]> = new Subject();

  private observe() {
    this.data$.next(this.data);
  }

  public addToCartOrIncrementCount(product: ProductInterface): void {
    const productInData = this.data.find(el => el.id === product.id);
    if (!productInData) {
      this.data.push({ ...product, __count: 1 });
    } else {
      productInData.__count++;
    }
    this.observe();
  }

  removeItemOrDecrementCount(id: number): Promise<string> {
    const index = this.data.findIndex(el => el.id === id);
    return new Promise((resolve, reject) => {
      if (index === -1) reject('not found');
      this.data[index].__count--;
      if (this.data[index].__count <= 0) {
        this.data.splice(index, 1);
        resolve('delete');
      } else resolve('decrement');
      this.observe();
    });
  }

  dataAsObservable(): Observable<(ProductInterface & { __count: number })[]> {
    return this.data$.asObservable().pipe(startWith(this.data));
  }
}
