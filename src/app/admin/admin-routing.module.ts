import { AdminComponent } from '@admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./pages/products-manage/products-manage.component').then(
        m => m.ProductsManageComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form',
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./pages/products-manage/manage-form/manage-form.component').then(
            m => m.ManageFormComponent
          ),
        // todo:
        canDeactivate: [],
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./pages/products-manage/manage-product-card/manage-product-card.component').then(
            m => m.ManageProductCardComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
