import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '@shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CollectionPreviewComponent } from './collection-preview/collection-preview.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, CollectionPreviewComponent, CarouselComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    SharedModule,
    MatGridListModule,
    NgOptimizedImage,
    MatRadioModule,
  ],
})
export class HomeModule {}
