import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProductService]
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'Online Shopping';
  subscription: Subscription;
  productList:any
  cartCount=0;
  searchProduct={CategoryName:''}
  ngOnInit(){
    if(sessionStorage.getItem('CartList')!==null){
      let cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
      this.cartCount = cartListItem.length;
    }
    this.subscription = this.productService.updateCart.subscribe(count=>{
      this.cartCount=this.cartCount+count;
    });
  }

  constructor(private productService:ProductService){}

  SearchProduct(){
    this.productService.updateProduct.next(this.searchProduct);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
