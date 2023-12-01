import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
import { LikeService } from '@services/like.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-products-render-container',
  templateUrl: './products-render-container.component.html',
  styleUrls: ['./products-render-container.component.scss'],
})
export class ProductsRenderContainerComponent {
  @Input() cols = 4;
  @Input({ required: true }) products!: ProductInterface[];

  constructor(
    private cart: ShoppingCartService,
    private likeService: LikeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  isSmall$: Observable<number> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      map(matches => (matches ? 0.5 : 1)),
      shareReplay()
    );

  calculateGap(): string {
    return `${10 / this.cols}%`;
  }

  addToCart(product: ProductInterface) {
    this.cart.addToCart(product);
  }

  like(like: { id: string; like: boolean }) {
    this.likeService.toggleLike(like.id, like.like);
  }
}
