import { Metadata } from './../../../shared/interfaces/category';
import { Subscription } from 'rxjs';
import { allProducts } from './../../../shared/interfaces/product';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import {
  isPlatformBrowser,
  NgClass,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { CategorySliderComponent } from '../../additions/category-slider/category-slider.component';
import { FirstSliderComponent } from '../../additions/first-slider/first-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CategorySliderComponent,
    FirstSliderComponent,
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productList: allProducts[] = [];
  Metadata!: Metadata;
  userSearch: string = '';

  sumResult!: number;
  productsSubscription: Subscription = new Subscription();
  addCartSubscription: Subscription = new Subscription();

  //for pagination
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  wishlistArray: string[] = [];

  rtl: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userToken') !== '') {
        this.wishlistCheck();
      }

      if (document.dir === 'rtl') {
        this.rtl = true;
      } else {
        this.rtl = false;
      }
    }
    this.getAllProducts(this.currentPage);
  }

  getAllProducts(page: number) {
    this.productList = [];
    this.productsSubscription = this._ProductService
      .getProducts(page)
      .subscribe({
        next: (res) => {
          this.productList = [...this.productList, ...res.data];

          this.totalPages = res.metadata.numberOfPages;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          // console.log(this.productList);
        },
      });
  }

  addToCart(id: string) {
    this.addCartSubscription = this._CartService.addToCart(id).subscribe({
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

  //get wishlist IDs
  wishlistCheck() {
    this.wishlistArray = [];
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistArray = res.data.map((item) => item._id);
        // console.log(this.wishlistArray);
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
    this._WishlistService.removeFromWishlist(product_id).subscribe({
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

  //  pagination
  loadPage(page: number) {
    this.currentPage = page;
    this.getAllProducts(this.currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  loadNextPage() {
    if (this.currentPage <= this.totalPages) {
      this.currentPage += 1;
      this.getAllProducts(this.currentPage);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // console.log(this.currentPage);
    }
  }

  loadPrevPage() {
    if (this.currentPage >= this.totalPages) {
      this.currentPage -= 1;
      this.getAllProducts(this.currentPage);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
