import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CategorymanagementComponent } from './categorymanagement/categorymanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  {path:'product',component:ProductComponent},
  {path:'category',component:CategoryComponent},
  {path:'productmngmnt',component:ProductmanagementComponent},
  {path:'categorymngmt',component:CategorymanagementComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'product-details',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: '**', redirectTo: '/product', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
