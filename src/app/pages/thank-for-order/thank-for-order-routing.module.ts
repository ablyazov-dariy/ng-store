import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankForOrderComponent } from '@pages/thank-for-order/thank-for-order.component';

const routes: Routes = [{ path: '', component: ThankForOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankForOrderRoutingModule {}
