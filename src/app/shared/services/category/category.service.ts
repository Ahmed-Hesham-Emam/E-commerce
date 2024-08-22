import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';
import { Observable } from 'rxjs';
import { categryResponse } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  //Ping the API to get all categories
  getAllCategories():Observable<categryResponse>{
   return this._HttpClient.get<categryResponse>(`${Enviroment.BaseURL}/api/v1/categories`)
  }


}
