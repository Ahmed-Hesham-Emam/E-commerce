import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { addToCart, cart } from '../../interfaces/cart';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private tokenHeader!: { token: string };
  sum: BehaviorSubject<string> = new BehaviorSubject<string>('');

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

  addToCart(product_id: string): Observable<addToCart> {
    return this._HttpClient.post<addToCart>(
      `${Enviroment.BaseURL}/api/v1/cart`,
      { productId: product_id }
    );
  }

  getCart(): Observable<cart> {
    return this._HttpClient.get<cart>(`${Enviroment.BaseURL}/api/v1/cart`);
  }

  updateItemsQuantity(product_id: string, count: string): Observable<cart> {
    return this._HttpClient.put<cart>(
      `${Enviroment.BaseURL}/api/v1/cart/${product_id}`,
      { count: count }
    );
  }

  removeCartItem(product_id: string): Observable<cart> {
    return this._HttpClient.delete<cart>(
      `${Enviroment.BaseURL}/api/v1/cart/${product_id}`
    );
  }

  emptyCart() {
    return this._HttpClient.delete(`${Enviroment.BaseURL}/api/v1/cart`);
  }
}
