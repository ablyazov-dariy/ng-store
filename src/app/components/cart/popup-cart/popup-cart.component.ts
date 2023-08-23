import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ProductWithCountInterface } from '@interfaces/product-with-count.interface';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupCartComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  @ViewChild('dialogElement') private dialogElement!: ElementRef<HTMLDialogElement>;

  public data$: Observable<ProductWithCountInterface[]>;

  constructor(private cartService: ShoppingCartService) {
    this.data$ = this.cartService.data$;
  }

  toggleDialog() {
    const element = this.dialogElement.nativeElement;
    element.open ? element.close() : element.show();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTotalPrice(data: ProductWithCountInterface[]): number {
    return data.reduce((total, product) => total + product.price * product.__count, 0);
  }
}