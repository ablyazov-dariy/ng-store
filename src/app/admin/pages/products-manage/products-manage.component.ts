import { AdminModule } from '@admin/admin.module';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-products-manage',
  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    AdminModule,
    RouterModule,
  ],

  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.scss'],
})
export class ProductsManageComponent implements OnInit {
  ngOnInit(): void {}
}
