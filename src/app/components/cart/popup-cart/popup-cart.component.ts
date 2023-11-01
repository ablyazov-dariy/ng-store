import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';
import { ShoppingCartService } from '@services/shopping-cart.service';

import { filter, map, merge } from 'rxjs';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupCartComponent implements AfterViewInit {
  public isCardOpen = signal(false);
  public data$ = this.cartService.data$;

  @ViewChild(CdkOverlayOrigin, { read: ElementRef }) private cartOpenButton?: ElementRef;
  @ViewChild(CdkConnectedOverlay) private connectedOverlay?: CdkConnectedOverlay;

  constructor(
    private cartService: ShoppingCartService,
    private focusMonitor: FocusMonitor,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    if (this.cartOpenButton && this.connectedOverlay) {
      merge(this.backdropClick$(this.connectedOverlay), this.focus$(this.cartOpenButton))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => this.isCardOpen.set(value));
    }
  }

  getTotalPrice(data: ProductWithCountInterface[]): number {
    return data.reduce((total, product) => total + product.price * product.__count, 0);
  }

  private focus$(btn: ElementRef) {
    return this.focusMonitor.monitor(btn).pipe(
      filter(focused => !!focused),
      map(() => true)
    );
  }

  private backdropClick$(overlay: CdkConnectedOverlay) {
    return overlay.backdropClick.pipe(map(() => false));
  }
}
