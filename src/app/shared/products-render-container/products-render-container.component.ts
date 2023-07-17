import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Input } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
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

  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

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
}
