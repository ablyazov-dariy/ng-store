import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { MatMenuModule } from '@angular/material/menu';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopupCartComponent } from '@components/cart/popup-cart/popup-cart.component';
import { FooterComponent } from '@components/footer/footer.component';
import { AccountDropdownComponent } from '@components/nav/account-dropdown/account-dropdown.component';
import { DrawerTabsComponent } from '@components/nav/drawer/drawer-tabs/drawer-tabs.component';
import { SearchOpenBtnComponent } from '@components/nav/search-open-btn/search-open-btn.component';
import { SidenavComponent } from '@components/nav/sidenav/sidenav.component';
import { ShippingAddComponent } from '@components/shipping-add/shipping-add.component';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterLimitPipe } from './pipes/character-limit.pipe';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavComponent,
    DrawerTabsComponent,
    AccountDropdownComponent,
    PopupCartComponent,
    SearchOpenBtnComponent,
    ShippingAddComponent,
    CharacterLimitPipe,
    CartItemComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
