import { AdminProductsService } from '@admin/services/admin-products.service';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductForm } from '@interfaces/ProductForm.type';
import { APIService } from '@services/api.service';
import { catchError, iif, map, Observable, of } from 'rxjs';

@Injectable()
export class ManageService {
  private url = environment.url;
  constructor(
    private fb: FormBuilder,
    private adminProductsService: AdminProductsService,
    private apiService: APIService
  ) {}

  productManageForm(prodId?: number): Observable<ProductForm> {
    return iif(
      () => !prodId,
      of(undefined),
      this.adminProductsService.getProductsObservable({ id: prodId })
    ).pipe(
      map(data => {
        const prod = data?.at(0);
        return this.fb.group({
          id: [prodId ?? this.uniqID(), [Validators.required]],
          new: [!prod, []],
          name: [prod?.name ?? '', [Validators.required]],
          imgUrl: [prod?.imgUrl ?? '', [Validators.required]],
          price: [
            prod?.price ?? 0,
            [Validators.required, Validators.min(0), Validators.pattern(/^\d+(?:\.\d+)?$/)],
          ],
          discount: [
            prod?.discount ?? 0,
            [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)],
          ],
          featured: [prod?.featured ?? false, [Validators.pattern(/^(true|false)$/)]],
          collection: [prod?.collection ?? '', []],
          description: [prod?.description ?? '', [Validators.required]],
          discountUntil: [
            // prod?.discountUntil?.toDateString() ?? null,
            prod?.discountUntil?.toString() ?? null,
            [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
          ],
          colors: [prod?.colors.join(',') ?? '', [Validators.required]],
          sizes: [prod?.sizes.join(',') ?? 's', [Validators.required]],
        });
      })
    );
  }

  saveChange(product: ProductInterface) {
    return iif(
      () => !product.new,
      this.apiService.put(this.url, product),
      this.apiService.post(this.url, product)
    ).pipe(catchError(error => of(error.message)));
  }

  private uniqID(): number {
    return Date.now();
  }
}
