import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interfaces/category';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categryList!: category[];

  constructor(private _CategoryService:CategoryService) { }

  ngOnInit(): void {
    this.getcategories()
  }

  getcategories(){
    this._CategoryService.getAllCategories().subscribe((data)=>{
      this.categryList = data.data;
    })
  }

}
