import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CategorymanagementComponent } from './categorymanagement/categorymanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:'product',component:ProductComponent},
  {path:'category',component:CategoryComponent},
  {path:'productmngmnt',component:ProductmanagementComponent},
  {path:'categorymngmt',component:CategorymanagementComponent},
  {path:'cart',component:CartComponent},
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: '**', redirectTo: '/product', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
