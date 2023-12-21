import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAccessGuard } from '@app/guards/admin-access.guard';
import { authDialogResolver } from '@app/guards/auth-dialog.resolver';
import { authPopupGuard } from '@app/guards/auth-popup.guard';
import { authGuard } from '@app/guards/auth.guard';
import { ownerAccessGuard } from '@app/guards/owner-access.guard';
import { AccountCardComponent } from '@components/user/account-card/account-card.component';
import { LoginFormComponent } from '@components/user/login-form/login-form.component';
import { RecoveryFormComponent } from '@components/user/recovery-form/recovery-form.component';
import { SignupFormComponent } from '@components/user/signup-form/signup-form.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule),
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule),
  },
  {
    path: 'prod/:id',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('@pages/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [authGuard],
  },
  {
    path: 'thank',
    loadChildren: () =>
      import('@pages/thank-for-order/thank-for-order.module').then(m => m.ThankForOrderModule),
    // TODO: add guard
    canMatch: [],
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/admin/admin.module').then(m => m.AdminModule),
    canMatch: [authGuard, adminAccessGuard],
    data: { canCreate: true },
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/admin/admin.module').then(m => m.AdminModule),
    canMatch: [authGuard, ownerAccessGuard],
    data: { canCreate: false },
  },
  {
    path: 'login',
    outlet: 'auth',
    component: LoginFormComponent,
    canActivate: [authPopupGuard],
    resolve: { void: authDialogResolver },
  },
  {
    path: 'recovery',
    outlet: 'auth',
    component: RecoveryFormComponent,
    canActivate: [authPopupGuard],
    resolve: { void: authDialogResolver },
  },
  {
    path: 'signup',
    outlet: 'auth',
    component: SignupFormComponent,
    canActivate: [authPopupGuard],
    resolve: { void: authDialogResolver },
  },
  {
    path: 'profile',
    outlet: 'auth',
    component: AccountCardComponent,
    canActivate: [authGuard],
    resolve: { void: authDialogResolver },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
