import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AllordersService } from '../../../shared/services/allorders/allorders.service';
import { CartItem, OrderHistory } from '../../../shared/interfaces/allproducts';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit  {
  selectedOrder: OrderHistory | null = null;
  cartItems!: CartItem[];

  constructor(private _AllordersService: AllordersService) {}


  ngOnInit(): void {
    // this._AllordersService.selectedOrder$.subscribe((res) => {
    //   this.selectedOrder = res!;
    //   console.log((this.cartItems = res?.cartItems || []));

    //   console.log('Received order:', res);
    // });
    this.orderDetails();
  }

  orderDetails() {
    if (typeof localStorage !== 'undefined') {
      // Try to get the saved order from local storage
      const savedOrder = localStorage.getItem('selectedOrder');

      if (savedOrder) {
        this.selectedOrder = JSON.parse(savedOrder);
        this.cartItems = this.selectedOrder?.cartItems! || [];
        console.log('Received order from local storage:', this.selectedOrder);
      }
    }
  }




}
