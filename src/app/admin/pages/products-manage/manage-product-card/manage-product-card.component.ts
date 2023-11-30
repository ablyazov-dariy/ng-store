import { ManageService } from '@admin/services/manage.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-manage-product-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, NgOptimizedImage, SharedModule],
  templateUrl: './manage-product-card.component.html',
  styleUrls: ['./manage-product-card.component.scss'],
})
export class ManageProductCardComponent {
  constructor(private manageService: ManageService) {}

  get product() {
    return this.manageService.form()?.value;
  }
}
