import { AdminProductsService } from '@admin/services/admin-products.service';

import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductInterface, Size } from '@interfaces/product.interface';
import { ProductForm } from '@interfaces/ProductForm.type';
import { StringProductInterface } from '@interfaces/string-product.interface';
import {
  debounce,
  filter,
  map,
  Observable,
  of,
  raceWith,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManageService {
  public debounceTrigger = new Subject();
  public form = signal<ProductForm | undefined>(undefined);
  public chooseControl = new FormControl('', [], []);

  constructor(private fb: FormBuilder, private adminProductsService: AdminProductsService) {}

  public createNewProduct() {
    return of(null).pipe(
      map(() => this.createForm()),
      tap(form => this.form.set(form)),
      switchMap(form => form.valueChanges),
      filter(() => this.form()?.valid ?? false),
      debounce(() => this.debounce()),
      map(data => this.productFromForm(data as Partial<StringProductInterface>)),
      switchMap(product => this.adminProductsService.createNewProduct(product)),
      map(res => res.id),
      tap(id => this.form.set(undefined))
    );
  }

  public editProduct(id: string) {
    return this.adminProductsService.getProductsObservable({ id: id, limit: 99 }).pipe(
      map(data => this.createForm(data.at(0))),
      tap(form => this.form.set(form)),
      switchMap(form => form.valueChanges),
      filter(() => this.form()?.valid ?? false),
      debounce(() => this.debounce()),
      map(data => this.productFromForm(data as Partial<StringProductInterface>)),
      switchMap(data => this.adminProductsService.updateProduct(id, data)),
      tap(id => this.form.set(undefined))
    );
  }

  public deleteProduct(id: string) {
    return this.adminProductsService.deleteProduct(id).pipe(tap(id => this.form.set(undefined)));
  }

  private createForm(product?: ProductInterface): ProductForm {
    return this.fb.group({
      new: [product?.new ?? true, []],
      name: [product?.name ?? '', [Validators.required]],
      imgUrl: [product?.imgUrl ?? '', [Validators.required]],
      price: [
        product?.price ?? null,
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(?:\.\d+)?$/)],
      ],
      discount: [
        product?.discount ?? null,
        [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)],
      ],
      featured: [product?.featured ?? false, [Validators.pattern(/^(true|false)$/)]],
      description: [product?.description ?? '', [Validators.required]],
      discountUntil: [
        product?.discountUntil?.toString() ?? null,
        [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      colors: [product?.colors.join(',') ?? '', [Validators.required]],
      sizes: [
        product?.sizes.join(',') ?? '',
        [
          Validators.required,
          // TODO: write pattern
          // Validators.pattern(),
        ],
      ],
    });
  }

  private productFromForm(data: Partial<StringProductInterface>): Omit<ProductInterface, 'id'> {
    // TODO create class
    return {
      name: data.name ?? 'name not provided',
      imgUrl: data.imgUrl ?? 'url not provided',
      description: data.description ?? 'url not provided',
      discount: data.discount ? +data.discount : 0,
      featured: data.featured == 'true' ?? false,
      new: data.new == 'true' ?? false,
      price: data.price ? +data.price : 0,
      colors: data.colors ? data.colors.split(',') : [],
      sizes: data.sizes ? (data.sizes.split(',') as Size[]) : [],
    };
  }

  private debounce(): Observable<unknown> {
    return timer(10000).pipe(raceWith(this.debounceTrigger));
  }
}
