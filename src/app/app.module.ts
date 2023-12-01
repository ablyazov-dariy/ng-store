import { A11yModule } from '@angular/cdk/a11y';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CartItemComponent } from '@components/cart/cart-item/cart-item.component';
import { PopupCartComponent } from '@components/cart/popup-cart/popup-cart.component';
import { AccountDropdownComponent } from '@components/layout/account-dropdown/account-dropdown.component';
import { DrawerTabsComponent } from '@components/layout/drawer/drawer-tabs/drawer-tabs.component';
import { FooterComponent } from '@components/layout/footer/footer.component';
import { NavbarComponent } from '@components/layout/navbar/navbar.component';
import { SearchOpenBtnComponent } from '@components/layout/search-open-btn/search-open-btn.component';
import { SidenavComponent } from '@components/layout/sidenav/sidenav.component';

import { environment } from '@env/environment';

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
    NgOptimizedImage,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    ScrollingModule,
    MatBadgeModule,
    CdkMenuModule,
    OverlayModule,
    A11yModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
