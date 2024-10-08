import { WishlistService } from './../../../shared/services/wishlist/wishlist.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { allProducts } from '../../../shared/interfaces/product';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
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
  };

  product!: allProducts;

  //Create a variable to store the subscription
  productSubscription: Subscription = new Subscription();
  addCartSubscription: Subscription = new Subscription();

  sumResult!: number;
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService,
    private _ActivatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  wishlistArray: string[] = [];
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this._ActivatedRoute.paramMap.subscribe((params) => {
        const refinedID = params.get('id');
        this.getProductsById(refinedID!);
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken') !== '') {
        this.wishlistCheck();
      }
    }
  }

  //ping the API to get the product by its ID
  getProductsById(refinedID: string) {
    this.productSubscription = this._ProductService
      .getProductsById(refinedID)
      .subscribe({
        next: (response) => {
          this.product = response.data;
          // console.log(this.product.images);
        },
      });
  }

  addToCart(product_id: string) {
    this.addCartSubscription = this._CartService
      .addToCart(product_id)
      .subscribe({
        next: (res) => {
          this.sumResult = res.data.products.reduce(
            (sum: number, product: any) => sum + product.count,
            0
          );
          localStorage.setItem('sum', this.sumResult.toString());
          this.toastr.success(res.message, res.status, {
            timeOut: 1500,
            progressBar: true,
            closeButton: true,
          });
        },
      });
  }

  //add to wishlist
  addToWishlist(product_id: string) {
    this._WishlistService.addToWishlist(product_id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, res.status, {
          timeOut: 1500,
          progressBar: true,
          closeButton: true,
        });
        this.wishlistCheck();
      },
    });
  }

  //remove from wishlist
  removeFromWishlist(product_id: string) {
    this._WishlistService.removeFromWishlist(product_id).subscribe((res) => {
      this.toastr.success(res.message, res.status, {
        timeOut: 1500,
        progressBar: true,
        closeButton: true,
      });
      this.wishlistCheck();
    });
  }

  //get wishlist IDs
  wishlistCheck() {
    this.wishlistArray = [];
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.wishlistArray.push(res.data[i]._id);
        }
        // console.log(this.wishlistArray);
      },
    });
  }
}
