import { AdminModule } from '@admin/admin.module';
import { PreviewProductComponent } from '@admin/pages/products-manage/preview-product/preview-product.component';
import { ManageService } from '@admin/services/manage.service';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '@app/classes/product';
import { ProductInterface, Size } from '@interfaces/product.interface';
import { ProductForm } from '@interfaces/ProductForm.type';
import { StringProductInterface } from '@interfaces/string-product.interface';
import { SharedModule } from '@shared/shared.module';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  Observable,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-products-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    PreviewProductComponent,
    AdminModule,
  ],
  providers: [ManageService],
  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.scss'],
})
export class ProductsManageComponent implements OnInit {
  chooseControl = new FormControl('', [Validators.pattern(/^(0|[1-9]\d*)$/)], []);
  formSig = signal<ProductForm | undefined>(undefined);
  private httpRes = toSignal(this.handelChooseInput$());

  constructor(private destroyRef: DestroyRef, private manageService: ManageService) {}

  private resEffect = effect(() => {
    if (!this.httpRes()) return;
    alert(this.httpRes());
  });

  private handelChooseInput$() {
    return this.chooseControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => !!value),
      map((value: string | null) => Number(value) || undefined),
      switchMap(value => this.manageService.productManageForm(value)),
      shareReplay(2),
      tap(form => this.formSig.set(form)),
      mergeMap(form => form.valueChanges),
      filter(form => !!this.formSig()?.valid),
      map(data => this.createProduct(data)),
      debounce(() => this.debounce()),
      switchMap(data => this.manageService.saveChange(data))
    );
  }

  private createProduct(data: StringProductInterface): ProductInterface {
    return new Product(
      +data.id,
      data.name,
      data.imgUrl,
      data.description,
      +data.price,
      data.collection,
      data.colors.split(','),
      data.sizes.split(',') as Size[],
      !!data.featured,
      data.discount ? +data.discount : 0,
      new Date(data.discountUntil ?? '')
    );
  }

  private debounce(): Observable<unknown> {
    return timer(1000);
    // .pipe(raceWith(of()));
  }

  ngOnInit(): void {}
}
