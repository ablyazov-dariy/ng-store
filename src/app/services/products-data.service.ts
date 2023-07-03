import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor(private http: HttpClient) {}

  public getJsonData(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('assets/data.json');
  }
}
