import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy  {
  productList:any
  subscription: Subscription;
  cartDetails = {ProductId: 0, ProductName: '', ProductImage: '', Quantity: 0, UnitPrice: 0, TotalPrice: 0};
  cartList = [];

  constructor(private productService:ProductService) { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.productService.updateProduct.subscribe(res=>{
      if(res.CategoryName!==''){
        this.productService.SearchProductByCategory(res).subscribe((product: any) => {
          if (product) {
            this.productList = product;
          } else {
            console.log(
              `Product not returning the list`
            );
          }
        });
      }else{
        this.BindProductList();
      }
    })
    this.BindProductList();
  }

  BindProductList(){
    this.productService.GetAllProductList({}).subscribe((product: any) => {
      if (product) {
        this.productList = product;
      } else {
        console.log(
          `Product not returning the list`
        );
      }
    });
  }

  addTocart(productId) {
    let product = this.productList.filter(item=>item.ProductId===productId)[0];
    this.cartDetails.ProductId = productId;
    this.cartDetails.ProductImage = product.ProductImage;
    this.cartDetails.ProductName = product.ProductName ;
    this.cartDetails.Quantity = 1;
    this.cartDetails.UnitPrice = product.Price;
    this.cartDetails.TotalPrice = product.Price;
    if ( sessionStorage.getItem('CartList') !== null && sessionStorage.getItem('CartList') !== undefined) {
      this.cartList = JSON.parse(sessionStorage.getItem('CartList'));
      this.cartList.push(this.cartDetails);
    } else {
      this.cartList.push(this.cartDetails);
    }
    sessionStorage.setItem('CartList', JSON.stringify(this.cartList));
    this.productService.updateCart.next(1);
  }
}
