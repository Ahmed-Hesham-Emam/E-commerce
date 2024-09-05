import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { cartData } from '../../../shared/interfaces/cart';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  sumResult!: number;
  data!: cartData;
  wishlistArray: string[] = [];

  cartSubscribtion: Subscription = new Subscription();
  removeSubscribtion: Subscription = new Subscription();
  updateSubscribtion: Subscription = new Subscription();
  emptySubscribtion: Subscription = new Subscription();
  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartSubscribtion = this._CartService.getCart().subscribe({
      next: (res) => {
        // console.log(res.data);

        this.sumResult = 0;
        for (let i = 0; i < res.data.products.length; i++) {
          this.sumResult += res.data.products[i].count;
        }
        localStorage.setItem('sum', this.sumResult.toString());

        this.data = res.data;
        // console.log(this.data);
      },
    });
  }

  removecartItem(product_id: string) {
    this.removeSubscribtion = this._CartService
      .removeCartItem(product_id)
      .subscribe({
        next: (res) => {
          this.sumResult = 0;
          for (let i = 0; i < res.data.products.length; i++) {
            this.sumResult += res.data.products[i].count;
          }
          localStorage.setItem('sum', this.sumResult.toString());
          this.data = res.data;
        },
      });
  }

  incrementalItemQuantityUpdate(product_id: string, count: number) {
    if (count <= 0) {
      this.removecartItem(product_id);
    } else {
      this.updateSubscribtion = this._CartService
        .updateItemsQuantity(product_id, count.toString())
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.sumResult = 0;
            for (let i = 0; i < res.data.products.length; i++) {
              this.sumResult += res.data.products[i].count;
            }
            localStorage.setItem('sum', this.sumResult.toString());
            this.data = res.data;
          },
        });
    }
  }

  manualItemQuantityUpdate(product_id: string) {
    document.getElementById('counter-input')?.addEventListener('blur', (e) => {
      let count = JSON.parse((e.target as HTMLInputElement).value);
      // console.log(count);

      if (count <= 0) {
        this.removecartItem(product_id);
      } else {
        this.updateSubscribtion = this._CartService
          .updateItemsQuantity(product_id, count.toString())
          .subscribe({
            next: (res) => {
              // console.log(res);
              this.sumResult = 0;
              for (let i = 0; i < res.data.products.length; i++) {
                this.sumResult += res.data.products[i].count;
              }
              localStorage.setItem('sum', this.sumResult.toString());
              this.data = res.data;
            },
          });
      }
    });
  }

  emptyCart() {
    this.emptySubscribtion = this._CartService.emptyCart().subscribe({
      next: (res) => {
        this.getCart();
      },
    });
  }
}
