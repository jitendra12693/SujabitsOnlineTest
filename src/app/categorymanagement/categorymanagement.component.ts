import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categorymanagement',
  templateUrl: './categorymanagement.component.html',
  styleUrls: ['./categorymanagement.component.css']
})
export class CategorymanagementComponent implements OnInit {
  category={ParentCategory:0,CategoryName:'',CategoryId:0}
  Success:string;
  Error:string;
  categoryList: any;

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.geAllCategory({}).subscribe((category: any) => {
      if (category) {
        this.categoryList = category;
      } else {
        console.log(
          `Category not returning the list`
        );
      }
    });
  }

  SaveCategory(){
    this.categoryService.saveCategory(this.category).subscribe(result => {
      this.Success="New category added successfully!!!"
      this.category={ParentCategory:0,CategoryName:'',CategoryId:0}
    },
    error => {
      this.Error="This category already added in inventory";
      console.error(error)
    });
  }
}
