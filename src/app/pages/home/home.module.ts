import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../components/shared/shared.module';
import { CollectionPreviewComponent } from './collection-preview/collection-preview.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [HomeComponent, CollectionPreviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    SharedModule,
    MatGridListModule,
    NgOptimizedImage,
  ],
})
export class HomeModule {}
