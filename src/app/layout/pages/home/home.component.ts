import {
  allProducts,
  Metadata,
  productResponse,
} from './../../../shared/interfaces/product';
import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { FirstSliderComponent } from "../../additions/first-slider/first-slider.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgClass, CategorySliderComponent, FirstSliderComponent , NgOptimizedImage , RouterLink],
    //Just becuse Angular does't like my icons wither it's inside <i> or <svg> it just hates font Awesome icons i guess
  host:{ngSkipHydration: 'true'},
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isLoading: boolean = false;

  productList: allProducts[] = [];

  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private _ProductService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts(this.currentPage);
  }

  getAllProducts(page: number) {
    this.isLoading = true;
    this._ProductService.getProducts(page).subscribe({
      next: (res) => {
        this.productList = [...this.productList, ...res.data];
        this.totalPages = res.metadata.numberOfPages;
        // console.log(this.productList);
        this.isLoading = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoading = false;
      },
    });
  }

  loadNextPage() {
    // Ensure there's a next page before trying to load more products
    if (this.currentPage < this.totalPages) {
      this.currentPage+=1;
      this.getAllProducts(this.currentPage);
      // console.log(this.currentPage);
    }
  }

  loadPrevPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage-=1;
      this.getAllProducts(this.currentPage);
      // console.log(this.currentPage);
    }
  }
}
