import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';
import { ProductInterface } from '@interfaces/product.interface';

import { LocalStorageService } from '@services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly accessKey = environment.cartAccessKey;
  private data: ProductWithCountInterface[];
  public data$: BehaviorSubject<ProductWithCountInterface[]>;

  constructor(private ls: LocalStorageService) {
    const storedData = this.ls.getItem(this.accessKey);
    storedData ? (this.data = storedData as ProductWithCountInterface[]) : (this.data = []);

    this.data$ = new BehaviorSubject([...this.data]);
    this.handelStorageEvent();
  }

  private handelStorageEvent() {
    this.ls.notifier.subscribe(event => {
      if (event.key !== this.accessKey) return;
      if (!event.newValue) return;
      this.data = JSON.parse(event.newValue);
      this.data$.next([...this.data]);
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

  decrement(id: string) {
    const index = this.getItemIndexById(id);
    if (index === -1) return;
    this.data[index].__count--;
    if (this.data[index].__count <= 0) {
      this.remove(id);
      return;
    }
    this.observe();
  }

  remove(id: string) {
    const index = this.getItemIndexById(id);
    if (index === -1) return;
    this.data.splice(index, 1);
    this.observe();
  }

  clearAll() {
    this.data = [];
    this.observe();
  }

  private getItemIndexById(id: string): number {
    return this.data.findIndex(el => el.id === id);
  }

  private isAlreadyInData(product: ProductInterface): boolean {
    return this.data.find(el => el.id === product.id) !== undefined;
  }

  private observe() {
    this.ls.setItem(this.accessKey, this.data);
    this.data$.next([...this.data]);
  }
}
