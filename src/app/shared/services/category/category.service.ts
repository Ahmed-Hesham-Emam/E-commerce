import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';
import { Observable } from 'rxjs';
import { categoryResponse } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  //Ping the API to get all categories
  getAllCategories(): Observable<categoryResponse> {
    return this._HttpClient.get<categoryResponse>(
      `${Enviroment.BaseURL}/api/v1/categories`
    );
  }
}
