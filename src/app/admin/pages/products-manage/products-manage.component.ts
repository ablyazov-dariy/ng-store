import { PreviewProductComponent } from '@admin/pages/products-manage/preview-product/preview-product.component';
import { AdminProductsService } from '@admin/services/admin-products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductInterface } from '@interfaces/product.interface';
import { ProductForm } from '@interfaces/ProductForm.type';
import { SharedModule } from '@shared/shared.module';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';

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
  ],
  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.scss'],
})
export class ProductsManageComponent implements OnInit {
  productForm: ProductForm = this.createForm();
  get productFormValue() {
    return this.productForm.valueChanges as Observable<ProductInterface>;
  }

  constructor(private fb: FormBuilder, private adminProductsService: AdminProductsService) {}

  ngOnInit(): void {
    this.checkNew()?.subscribe(product => {
      if (product[0]) {
        for (let key in product[0]) {
          // @ts-ignore
          this.productForm.get(key)?.patchValue(product[key]);
        }
        this.productForm.controls.new.patchValue(false);
      } else {
      }
    });
  }

  onFileUpload(event: Event): void {
    this.productForm.controls.id;
    this.productForm
      .get('imgUrl')
      ?.patchValue(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
  }

  private checkNew() {
    return this.productForm.get('id')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(() => this.productForm.get('id')!.valid),
      switchMap((id: number) => this.adminProductsService.getProductsObservable({ id: id }))
    );
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      imgUrl: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.min(0), Validators.max(100)]],
      featured: [false, []],
      collection: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discountUntil: ['', []],
      new: [true, []],
      colors: [[''], [Validators.required]],
      sizes: [[''], [Validators.required]],
      reviews: [[], []],
      favorite: [false, []],
    });
  }
}
