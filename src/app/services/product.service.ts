import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public API = 'http://localhost:64861/api';
  public PRODUCT_API = `${this.API}/Product/`;
  public PRODUCT_SAVEAPI = `${this.API}/Product/SaveProductDetails`;
  constructor(private http: HttpClient) { }
  updateProduct=new Subject<any>();
  updateCart=new Subject<any>();

  updateProductList(): Observable<any> {
    return this.updateProduct.asObservable();
  }

  updateCartCount(): Observable<any> {
    return this.updateCart.asObservable();
  }

  GetAllProductList(searchProduct: any): Observable<any> {
    return this.http.post<any>(this.PRODUCT_API + 'GetAllProductList/', searchProduct);
  }

  removeproduct(productDetails: any): Observable<any> {
    return this.http.post<any>(this.PRODUCT_API + 'RemoveProduct/', productDetails);
  }
  
  SearchProductByCategory(searchProduct: any): Observable<any> {
    return this.http.post<any>(this.PRODUCT_API + 'SearchProductByCategory/', searchProduct);
    //this.updateProduct.next(result);
    //return result;
  }

  public saveProduct(product: any): Observable<any> {
    let result: Observable<any>;
    if (product.ProductId) {
      result = this.http.post<any>(`${this.PRODUCT_SAVEAPI}`, product);
    } else {
      result = this.http.post<any>(this.PRODUCT_SAVEAPI, product);
    }
    return result;
  }
}
