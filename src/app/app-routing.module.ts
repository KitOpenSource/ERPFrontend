import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { PreorderComponent } from './preorder/preorder.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: 'product', component: ProductComponent },
  { path: 'preorder', component: PreorderComponent },
  { path:'dashboard', component: DashboardComponent},
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
