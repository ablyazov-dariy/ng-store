import { Component, Input } from '@angular/core';
import { ProductDetailsInterface } from '@interfaces/product-details.interface';

@Component({
  selector: 'app-confirm-table',
  templateUrl: './confirm-table.component.html',
  styleUrls: ['./confirm-table.component.scss'],
})
export class ConfirmTableComponent {
  displayedColumns: string[] = ['id', 'name', 'color', 'size'];
  @Input({ required: true }) products!: ProductDetailsInterface[];
  @Input({ required: true }) address!: string;
}
