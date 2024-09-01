import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../Base/Enviroment';
import { Observable } from 'rxjs';
import { brands } from '../../interfaces/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }


  getAllBrands(page: number = 1):Observable<brands>{
    return this._HttpClient.get<brands>(`${Enviroment.BaseURL}/api/v1/brands?page=${page}`);
  }

}
