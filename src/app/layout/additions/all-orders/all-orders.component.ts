import { OrderHistory } from './../../../shared/interfaces/allproducts';
import { Component, OnInit } from '@angular/core';
import { AllordersService } from '../../../shared/services/allorders/allorders.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  constructor(private _AllordersService: AllordersService) {}
  orderHistory!: OrderHistory[];
  selectedOrderIndex: number | null = null;

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory() {
    this._AllordersService.OrderHistory().subscribe((res) => {
      // console.log(res);
      this.orderHistory = res;
      this.orderHistory.reverse();

      // console.log(this.orderHistory);
    });
  }

  selectOrder(order: OrderHistory): void {
    localStorage.setItem('selectedOrder', JSON.stringify(order));
    this._AllordersService.setSelectedOrder(order);
  }
}
