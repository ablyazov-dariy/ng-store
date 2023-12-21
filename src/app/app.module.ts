import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
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
import { DrawerTabsComponent } from '@components/layout/drawer/drawer-tabs/drawer-tabs.component';
import { FooterComponent } from '@components/layout/footer/footer.component';
import { NavbarComponent } from '@components/layout/navbar/navbar.component';
import { SearchOpenBtnComponent } from '@components/layout/search-open-btn/search-open-btn.component';
import { SidenavComponent } from '@components/layout/sidenav/sidenav.component';
import { AccountCardComponent } from '@components/user/account-card/account-card.component';
import { AccountDropdownComponent } from '@components/user/account-dropdown/account-dropdown.component';
import { AuthDialogComponent } from '@components/user/auth-dialog/auth-dialog.component';
import { GoogleAuthComponent } from '@components/user/google-auth/google-auth.component';
import { LoginFormComponent } from '@components/user/login-form/login-form.component';
import { RecoveryFormComponent } from '@components/user/recovery-form/recovery-form.component';
import { SignupFormComponent } from '@components/user/signup-form/signup-form.component';

import { environment } from '@env/environment';

import { SharedModule } from '@shared/shared.module';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';

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
    AuthDialogComponent,
    GoogleAuthComponent,
    LoginFormComponent,
    RecoveryFormComponent,
    SignupFormComponent,
    AccountCardComponent,
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
    ContenteditableValueAccessorModule,
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
    DialogModule,
    ClipboardModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
