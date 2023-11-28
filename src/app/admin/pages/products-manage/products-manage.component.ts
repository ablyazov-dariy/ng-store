import { ManageInputComponent } from '@admin/pages/products-manage/manage-input/manage-input.component';
import { ManageService } from '@admin/services/manage.service';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { filter, merge, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-manage',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule, ManageInputComponent],

  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.scss'],
})
export class ProductsManageComponent implements OnInit {
  action$ = new Subject<string>();

  constructor(private manageService: ManageService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    merge(this.create$(), this.delete$(), this.edit$())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(console.log);
  }

  create$() {
    return this.action$.pipe(
      filter(action => action === 'create'),
      switchMap(() => this.manageService.createNewProduct())
    );
  }
  delete$() {
    return this.action$.pipe(
      filter(action => action === 'delete'),
      switchMap(() => this.manageService.deleteProduct(this.manageService.chooseControl.value!))
    );
  }
  edit$() {
    return this.action$.pipe(
      filter(action => action === 'edit'),
      switchMap(() => this.manageService.editProduct(this.manageService.chooseControl.value!))
    );
  }
}
