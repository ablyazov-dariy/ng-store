import { AdminProductsService } from '@admin/services/admin-products.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
  declarations: [AdminComponent, FileInputComponent],
  imports: [CommonModule, AdminRoutingModule, MatButtonModule, ReactiveFormsModule],
  providers: [AdminProductsService],
  exports: [FileInputComponent],
})
export class AdminModule {}
