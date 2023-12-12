import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAccessGuard } from '@app/guards/admin-access.guard';
import { authGuard } from '@app/guards/auth.guard';
import { ownerAccessGuard } from '@app/guards/owner-access.guard';

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
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
