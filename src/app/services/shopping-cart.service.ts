import { Injectable } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { LocalStorageService } from '@services/local-storage.service';
import { Observable, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly accessKey = 'cartStorageKey' as const;
  private data: (ProductInterface & { __count: number })[];
  private data$: Subject<(ProductInterface & { __count: number })[]> = new Subject();

  constructor(private ls: LocalStorageService) {
    const storedData = this.ls.getItem(this.accessKey);
    storedData
      ? (this.data = storedData as (ProductInterface & { __count: number })[])
      : (this.data = []);
    this.ls.notifier.subscribe(event => {
      if (event.key !== this.accessKey) return;
      if (!event.newValue) return;
      this.data = JSON.parse(event.newValue);
      this.data$.next(this.data);
    });
  }

  private observe() {
    this.ls.setItem(this.accessKey, this.data);
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
