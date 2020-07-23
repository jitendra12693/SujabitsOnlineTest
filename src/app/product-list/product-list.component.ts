import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList:any;
  subscription: Subscription;
  private router: Router;
  
  constructor(private productService:ProductService,private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription =this.route.params.subscribe(params => {});
    this.BindProductList();
  }

  ConfirmBox(productId){
    if(confirm('Are you sure to remove this product?')){
      if(true)
      this.productService.removeproduct(this.productList.filter(item=>item.ProductId===productId)[0])
      .subscribe(res=>{
        alert('You have removed one product Successfully');
        this.gotoList();
      });
    }
  }
  gotoList() {
    this.router.navigate(['/product-list']);
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
}
