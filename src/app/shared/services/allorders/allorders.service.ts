import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Enviroment } from '../../../Base/Enviroment';
import {  Observable } from 'rxjs';
import { OrderHistory } from '../../interfaces/allproducts';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  userID!: string;
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {

    if (isPlatformBrowser(platformId)) {
      this.userID = this._AuthService.decoded?.id ?? '';
    }
  }

  OrderHistory(): Observable<OrderHistory[]> {
    return this._HttpClient.get<OrderHistory[]>(
      `${Enviroment.BaseURL}/api/v1/orders/user/${this.userID}`
    );
  }

  
}
