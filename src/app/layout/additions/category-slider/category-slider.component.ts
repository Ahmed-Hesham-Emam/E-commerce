import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule , TranslateModule ],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      740: {
        items: 6,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };

  categryList!: category[];

  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CategoryService.getAllCategories().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.categryList = response.data;
      },

      error: (err) => {
        // console.log(err);
      },
    });
  }
}
