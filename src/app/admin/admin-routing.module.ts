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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
