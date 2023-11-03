import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductInterface } from '@interfaces/product.interface';

@Component({
  selector: 'app-preview-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-product.component.html',
  styleUrls: ['./preview-product.component.scss'],
})
export class PreviewProductComponent {
  @Input({ required: true }) product?: ProductInterface;
}
