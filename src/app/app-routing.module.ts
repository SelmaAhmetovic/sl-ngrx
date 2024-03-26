import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{path: 'products', component: ProductsComponent, canActivate:[AuthGuard]},
  {
    path: 'products',
    children: [
        { path: '', component: ProductsComponent,  title: 'List of all products' ,  canActivate:[AuthGuard]},
        {
            path: ':slug', title: 'Product', component: ProductComponent
        },
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
