import { addToCart } from './../../../shared/interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { data, wishlist } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  Data!: data[];
  sumResult!: number;
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this._WishlistService.getWishlist().subscribe((res) => {
      this.Data = res.data;
      // console.log(this.Data);
    });
  }

  addToCart(product_id: string) {
    this._CartService.addToCart(product_id).subscribe((res: addToCart) => {
      // console.log(res);
      this.sumResult = 0;
      for (let i = 0; i < res.data.products.length; i++) {
        this.sumResult += res.data.products[i].count;
      }
      localStorage.setItem('sum', this.sumResult.toString());

      this.toastr.success(res.message, res.status, {
        timeOut: 1500,
        progressBar: true,
        closeButton: true,
      });
    });
  }

  removeFromWishlist(product_id: string) {
    this._WishlistService.removeFromWishlist(product_id).subscribe((res) => {
      this.toastr.success(res.message, res.status, {
        timeOut: 1500,
        progressBar: true,
        closeButton: true,
      });
      this.getWishlist();
    });
  }
}
