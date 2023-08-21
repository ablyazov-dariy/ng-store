import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';
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

  public data$: Observable<(ProductInterface & { __count: number })[]>;

  constructor(private cartService: ShoppingCartService) {
    this.data$ = this.cartService.dataAsObservable();
  }

  toggleDialog() {
    const element = this.dialogElement.nativeElement;
    element.open ? element.close() : element.show();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTotalPrice(data: (ProductInterface & { __count: number })[]): number {
    return data.reduce((total, product) => total + product.price * product.__count, 0);
  }
}
