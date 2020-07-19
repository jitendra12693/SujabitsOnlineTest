import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartListItem: any;
  grandTotal: number;
  sub: Subscription;
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {});
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.calculateGrandTotal(this.cartListItem);
  }

  calculateGrandTotal(array) {
    this.grandTotal = 0;
    if (array  !== null && array !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        this.grandTotal = this.grandTotal + parseFloat(array[i].TotalPrice);
      }
    }
  }
  removefromcart(productId) {
    this.cartListItem = JSON.parse(sessionStorage.getItem('CartList'));
    this.findAndRemove(this.cartListItem, 'ProductId', productId);
    sessionStorage.setItem('CartList', JSON.stringify(this.cartListItem));
  }

  findAndRemove(array, property, value) {
    // tslint:disable-next-line:only-arrow-functions
    array.forEach(function(result, index) {
      if (result[property] === value) {
        // Remove from array
        array.splice(index, 1);
      }
    });
    this.calculateGrandTotal(this.cartListItem);
  }
  addquantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Add');
    this.calculateGrandTotal(this.cartListItem);
  }

  removequantity(productId) {
    this.findElementById(this.cartListItem, 'ProductId', productId, 'Remove');
    this.calculateGrandTotal(this.cartListItem);
  }

  findElementById(array, property, value, type) {
    if (type === 'Add') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) + 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    } else if (type === 'Remove') {
      // tslint:disable-next-line:only-arrow-functions
      array.forEach(function(result, index) {
        if (result[property] === value) {
          result.Quantity = parseFloat(result.Quantity) - 1;
          result.TotalPrice = parseFloat(result.Quantity) * parseFloat(result.UnitPrice);
        }
      });
    }
  }
}
