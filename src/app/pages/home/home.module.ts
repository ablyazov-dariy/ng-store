import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '@shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CollectionPreviewComponent } from './collection-preview/collection-preview.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroMainComponent } from './hero-main/hero-main.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    CollectionPreviewComponent,
    CarouselComponent,
    HeroMainComponent,
    HeroCardComponent,
    HeroFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    SharedModule,
    MatGridListModule,
    NgOptimizedImage,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class HomeModule {}
