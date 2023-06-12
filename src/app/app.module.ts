import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'; // remove
import { FooterComponent } from './components/footer/footer.component';

import { SharedModule } from './components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DrawerTabsComponent } from './components/nav/drawer/drawer-tabs/drawer-tabs.component';
import { SidenavComponent } from './components/nav/sidenav/sidenav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountDropdownComponent } from './components/nav/account-dropdown/account-dropdown.component';

import { PopupCartComponent } from './components/nav/popup-cart/popup-cart.component';

import { MatMenuModule } from '@angular/material/menu';
import { SearchOpenBtnComponent } from './components/nav/search-open-btn/search-open-btn.component';
import { ExpansionPanelComponent } from './components/nav/expansion-panel/expansion-panel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShippingAddComponent } from './components/shipping-add/shipping-add.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavComponent,
    DrawerTabsComponent,
    AccountDropdownComponent,
    PopupCartComponent,
    SearchOpenBtnComponent,
    ExpansionPanelComponent,
    ShippingAddComponent,
  ],
  imports: [
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
