import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';
import { Observable } from 'rxjs';
import { wishlist } from '../../interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  getWishlist(): Observable<wishlist> {
    return this._HttpClient.get<wishlist>(
      `${Enviroment.BaseURL}/api/v1/wishlist`
    );
  }

  addToWishlist(product_id: string): Observable<wishlist> {
    return this._HttpClient.post<wishlist>(
      `${Enviroment.BaseURL}/api/v1/wishlist`,
      { productId: product_id }
    );
  }

  removeFromWishlist(product_id: string): Observable<wishlist> {
    return this._HttpClient.delete<wishlist>(
      `${Enviroment.BaseURL}/api/v1/wishlist/${product_id}`
    );
  }
}
