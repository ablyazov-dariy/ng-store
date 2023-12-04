import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLevel } from '@app/enums/access-level';
import { accessGuard } from '@app/guards/access.guard';

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
    canActivate: [accessGuard(AccessLevel.user)],
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
    canMatch: [accessGuard(AccessLevel.admin)],
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
