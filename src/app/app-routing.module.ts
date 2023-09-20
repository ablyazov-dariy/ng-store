import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: 'shop', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule) },
  {
    path: 'prod/:id',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('@pages/checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: 'thank',
    loadChildren: () =>
      import('@pages/thank-for-order/thank-for-order.module').then(m => m.ThankForOrderModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
