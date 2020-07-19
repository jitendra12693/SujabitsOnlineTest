import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public API = 'http://localhost:64861/api';
  public CATEGORY_API = `${this.API}/Category/`;
  constructor(private http: HttpClient) { }

  public geAllCategory(searchCategory: any): Observable<any>{
    return this.http.post<any>(this.CATEGORY_API + 'GetAllCategoryList/', searchCategory);
  }

  public saveCategory(product: any): Observable<any> {
    let result: Observable<any>;
    if (product.CategoryId) {
      result = this.http.post<any>(this.CATEGORY_API + 'SaveCategoryDetails/', product);
    } else {
      result = this.http.post<any>(this.CATEGORY_API+ 'SaveCategoryDetails/', product);
    }
    return result;
  }
}
