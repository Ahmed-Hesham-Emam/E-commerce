import {
  checkOutSession,
  OrderStatusFail,
  OrderStatusSuccess,
} from './../../interfaces/orders';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';

import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private tokenHeader!: { token: string };
  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.tokenHeader = {
        token: localStorage.getItem('userToken') || '',
      };
    }
  }

  getOrders(
    cartId: string,
    data: checkOutSession
  ): Observable<OrderStatusSuccess | OrderStatusFail> {
    return this._HttpClient.post<OrderStatusSuccess | OrderStatusFail>(
      `${Enviroment.BaseURL}/api/v1/orders/checkout-session/${cartId}?url=${Enviroment.BaseCheckOutURL}`,
      {
        shippingAddress: data,
      },
      {
        headers: this.tokenHeader,
      }
    );
  }

  CashOrder(
    cartId: string,
    data: checkOutSession
  ): Observable<OrderStatusSuccess | OrderStatusFail> {
    return this._HttpClient.post<OrderStatusSuccess | OrderStatusFail>(
      `${Enviroment.BaseURL}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      },
      {
        headers: this.tokenHeader,
      }
    );
  }

}
