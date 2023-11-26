import { AdminProductsService } from '@admin/services/admin-products.service';
import { DestroyRef, Injectable, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from '@app/classes/product';
import { ProductInterface, Size } from '@interfaces/product.interface';
import { ProductForm } from '@interfaces/ProductForm.type';
import { StringProductInterface } from '@interfaces/string-product.interface';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ManageService {
  public form = signal<ProductForm | undefined>(undefined);
  public chooseControl = new FormControl('', [Validators.required, Validators.pattern(/^NEW$/)]);

  constructor(
    private fb: FormBuilder,
    private adminProductsService: AdminProductsService,
    private destroyRef: DestroyRef
  ) {}

  test = this.chooseControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(() => this.chooseControl.valid),
      switchMap(str => this.adminProductsService.getProductsObservable({})),
      map(prod => this.createForm(prod[0])),
      tap(form => this.form.set(form)),
      switchMap(form => form.valueChanges)
    )
    .subscribe(console.log);

  createForm(product?: ProductInterface): ProductForm {
    return this.fb.group({
      new: [product?.new ?? true, []],
      name: [product?.name ?? '', [Validators.required]],
      imgUrl: [product?.imgUrl ?? '', [Validators.required]],
      price: [
        product?.price ?? 0,
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(?:\.\d+)?$/)],
      ],
      discount: [
        product?.discount ?? 0,
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

  private createProduct(data: StringProductInterface): ProductInterface {
    return new Product(
      data.id,
      data.name,
      data.imgUrl,
      data.description,
      +data.price,
      data.colors.split(','),
      data.sizes.split(',') as Size[],
      !!data.featured,
      data.discount ? +data.discount : 0,
      data.discountUntil ?? ''
    );
  }

  // productManageForm(prodId?: string): Observable<ProductForm> {
  //   return iif(
  //     () => !prodId,
  //     of(undefined),
  //     this.adminProductsService.getProductsObservable({ id: prodId, limit: 1 })
  //   ).pipe(
  //     map(data => {
  //       const prod = data?.at(0);
  //       return this.createForm();
  //     })
  //   );
  // }
  //
  // saveChange(product: ProductInterface) {
  //   return iif(
  //     () => !product.new,
  //     this.adminProductsService.updateProduct(product),
  //     this.adminProductsService.createNewProduct(product)
  //   ).pipe(catchError(error => of(error.message)));
  // }
  //
  // private httpRes = toSignal(this.handelChooseInput$());
  //
  // private resEffect = effect(() => {
  //   if (!this.httpRes()) return;
  //   alert(this.httpRes());
  // });
  //
  // private handelChooseInput$() {
  //   return this.chooseControl.valueChanges.pipe(
  //     filter(value => !!value),
  //     map((value: string | null) => value || undefined),
  //     switchMap(value => this.manageService.productManageForm(value)),
  //     shareReplay(2),
  //     tap(form => this.formSig.set(form)),
  //     mergeMap(form => form.valueChanges),
  //     filter(form => !!this.formSig()?.valid),
  //     map(data => this.createProduct(data)),
  //     debounce(() => this.debounce()),
  //     tap(console.log),
  //     switchMap(data => this.manageService.saveChange(data))
  //   );
  // }
  //
  // private debounce(): Observable<unknown> {
  //   return timer(1000);
  //   // .pipe(raceWith(of()));
  // }
}
