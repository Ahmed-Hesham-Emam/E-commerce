import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AllordersService } from '../../../shared/services/allorders/allorders.service';
import { CartItem, OrderHistory } from '../../../shared/interfaces/allproducts';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgIf, TranslateModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  selectedOrder: OrderHistory | null = null;
  cartItems!: CartItem[];
  idCheck!: string;

  constructor(
    private _AllordersService: AllordersService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.orderDetails();
  }

  orderDetails() {
    this._ActivatedRoute.params.subscribe((p) => {
      this.idCheck = p['orderId'];
    });
    console.log(this.idCheck);

    // this.idCheck = this._Router.url.split('/')[2];

    this._AllordersService.OrderHistory().subscribe({
      next: (orders) => {
        orders.forEach((order) => {
          if (this.idCheck == order._id) {
            this.selectedOrder = order;
            this.cartItems = order.cartItems;
          }
        });

        // console.log('Received orders:', orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }
}
