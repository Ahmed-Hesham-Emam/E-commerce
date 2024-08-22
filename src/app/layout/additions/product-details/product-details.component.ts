import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { json } from 'stream/consumers';
import { allProducts, productByID } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: allProducts;

  constructor(
    private _ProductService: ProductService,
    private _Router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {}

  ngOnInit(): void {
    if(typeof window !== 'undefined') {
    //Eh... if it works it works ¯¯\_(ツ)_/¯¯
    const id = sessionStorage.getItem('currentPage');
    // console.log(id.split('/').slice(2,3).join(''));

    const refinedID = id ? id.split('/').slice(2, 3).join('') : '';

    this.getProductsById(refinedID);
    }
  }

  //ping the API to get the product by its ID
  getProductsById(refinedID: string) {
    this._ProductService.getProductsById(refinedID).subscribe({
      next: (response) => {
        this.product = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
