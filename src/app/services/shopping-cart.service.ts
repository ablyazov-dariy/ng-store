import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';
import { ProductInterface } from '@interfaces/product.interface';

import { LocalStorageService } from '@services/local-storage.service';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly accessKey = environment.cartAccessKey;
  private data: ProductWithCountInterface[];
  private data$: Subject<ProductWithCountInterface[]> = new Subject();

  constructor(private ls: LocalStorageService) {
    const storedData = this.ls.getItem(this.accessKey);
    storedData ? (this.data = storedData as ProductWithCountInterface[]) : (this.data = []);
    this.ls.notifier.subscribe(event => {
      if (event.key !== this.accessKey) return;
      if (!event.newValue) return;
      this.data = JSON.parse(event.newValue);
      this.data$.next(this.data);
    });
  }

  public addToCart(product: ProductInterface): void {
    if (this.isAlreadyInData(product)) return;
    this.data.push({ ...product, __count: 1 });
    this.observe();
  }
  increment(product: ProductInterface) {
    (product as ProductWithCountInterface).__count++;
    this.observe();
  }

  decrement(id: number) {
    const index = this.getItemIndexById(id);
    if (index === -1) return;
    this.data[index].__count--;
    this.data[index].__count <= 0 ? this.remove(id) : null;
    this.observe();
  }

  remove(id: number) {
    const index = this.getItemIndexById(id);
    if (index === -1) return;
    this.data.splice(index, 1);
    this.observe();
  }

  dataAsObservable(): Observable<ProductWithCountInterface[]> {
    return this.data$.asObservable().pipe(startWith(this.data));
  }

  private getItemIndexById(id: number): number {
    return this.data.findIndex(el => el.id === id);
  }

  private isAlreadyInData(product: ProductInterface): boolean {
    return this.data.find(el => el.id === product.id) !== undefined;
  }

  private observe() {
    this.ls.setItem(this.accessKey, this.data);
    this.data$.next(this.data);
  }
}
