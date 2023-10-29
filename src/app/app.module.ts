import { CdkMenuModule } from '@angular/cdk/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { MatMenuModule } from '@angular/material/menu';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartItemComponent } from '@components/cart/cart-item/cart-item.component';

import { PopupCartComponent } from '@components/cart/popup-cart/popup-cart.component';
import { AccountDropdownComponent } from '@components/layout/account-dropdown/account-dropdown.component';
import { FooterComponent } from '@components/layout/footer/footer.component';
import { DrawerTabsComponent } from '@components/layout/nav/drawer/drawer-tabs/drawer-tabs.component';
import { SearchOpenBtnComponent } from '@components/layout/nav/search-open-btn/search-open-btn.component';
import { SidenavComponent } from '@components/layout/nav/sidenav/sidenav.component';
import { NavbarComponent } from '@components/layout/navbar/navbar.component';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavComponent,
    DrawerTabsComponent,
    AccountDropdownComponent,
    PopupCartComponent,
    SearchOpenBtnComponent,
    CartItemComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatGridListModule,
    NgOptimizedImage,
    MatCardModule,
    ScrollingModule,
    MatBadgeModule,
    CdkMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
