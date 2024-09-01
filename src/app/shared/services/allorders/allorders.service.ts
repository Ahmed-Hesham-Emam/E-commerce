import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Enviroment } from '../../../Base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderHistory } from '../../interfaces/allproducts';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  userID!: string;
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {
    this.userID = this._AuthService.decoded!.id!;
  }

  private selectedOrderSource = new BehaviorSubject<OrderHistory | null>(null);
  selectedOrder$ = this.selectedOrderSource.asObservable();

  setSelectedOrder(order: OrderHistory) {
    this.selectedOrderSource.next(order);
  }

  OrderHistory(): Observable<OrderHistory[]> {
    return this._HttpClient.get<OrderHistory[]>(
      `${Enviroment.BaseURL}/api/v1/orders/user/${this.userID}`
    );
  }
}
