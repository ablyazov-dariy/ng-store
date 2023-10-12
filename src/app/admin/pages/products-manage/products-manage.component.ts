import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products-manage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.scss'],
})
export class ProductsManageComponent {}
