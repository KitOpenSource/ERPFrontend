import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { MatTableFilterModule } from 'mat-table-filter';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { PreorderComponent } from './preorder/preorder.component';
import { PreorderListComponent } from './preorder/preorder-list/preorder-list.component';
import { PreorderCreateComponent } from './preorder/preorder-create/preorder-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DashboardComponent,
    AuthComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    PreorderComponent,
    PreorderListComponent,
    PreorderCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
