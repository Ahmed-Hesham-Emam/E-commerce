import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Enviroment } from '../../../Base/Enviroment';
import { Observable } from 'rxjs';
import { productByID, productResponse } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //putting the base API url and the endpoint in one variable juct cuz i can
  private apiUrl = `${Enviroment.BaseURL}/api/v1/products`

  constructor(private _HttpClient:HttpClient) { }


//ping the API to get all products by pages 
  getProducts(page: number = 1):Observable<productResponse>
  {
  return  this._HttpClient.get<productResponse>(`${this.apiUrl}?page=${page}`)
  }


  //ping the API to get the product by its ID
  getProductsById(id: string):Observable<productByID>{
    return this._HttpClient.get<productByID>(`${Enviroment.BaseURL}/api/v1/products/${id}`)
  }


}

