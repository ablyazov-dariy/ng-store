import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from '@interfaces/product.interface';
import { LikeService } from '@services/like.service';
import { ProductsService } from '@services/products.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private likeService: LikeService,
    private cart: ShoppingCartService
  ) {}

  public product$ = this.route.params.pipe(
    takeUntil(this.destroy$),
    switchMap(params => this.productsService.getProductsObservable(params)),
    map(arr => arr[0])
  );

  public productsRecommendation$: Observable<ProductInterface[]> = of({
    limit: 4,
  }).pipe(
    takeUntil(this.destroy$),
    switchMap(params => this.productsService.getProductsObservable(params))
  );

  like(product: ProductInterface) {
    if (product?.favorite) {
      this.likeService.toggleLike(product.id, false);
    } else this.likeService.toggleLike(product!.id, true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  sizeControl: FormControl = new FormControl('', [Validators.required]);
  addToCart(product: ProductInterface) {
    let copy = Object.assign({}, product);
    copy.sizes = [this.sizeControl.value];

    this.cart.addToCartOrIncrementCount(copy);
  }
}
