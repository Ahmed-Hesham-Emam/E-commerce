import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LoginData,
  RegisterData,
  success,
  fail,
  Decode,
  email,
  Code,
  responseData,
} from '../../interfaces/auth-data';
import { Enviroment } from '../../../Base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Create a BehaviorSubject to store the user data
  userData: BehaviorSubject<Decode | null> = new BehaviorSubject<Decode | null>(
    null
  );

  decoded!: Decode | null;

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      // this._Router.events.subscribe((event) => {
      //   if (event instanceof NavigationEnd) {
      //     sessionStorage.setItem('currentPage', event.urlAfterRedirects);
      //   }
      // });

      // //Handle the case when the user refresh the page
      // const lastVisitedPage = sessionStorage.getItem('currentPage');
      // if (lastVisitedPage) {
      //   this._Router.navigate([lastVisitedPage]);
      // } else {
      //   this._Router.navigate(['/']);
      // }
      if (localStorage.getItem('userToken') === null) {
        localStorage.setItem('userToken', '');
      }
      //Decode the user data from the token if the user is logged in
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
      }
    }
  }

  //Ping the API to register the user
  signUp(data: RegisterData): Observable<success | fail> {
    return this._HttpClient.post<success | fail>(
      `${Enviroment.BaseURL}/api/v1/auth/signup`,
      data
    );
  }

  //Ping the API to login the user
  logIn(data: LoginData): Observable<success | fail> {
    return this._HttpClient.post<success | fail>(
      `${Enviroment.BaseURL}/api/v1/auth/signin`,
      data
    );
  }

  //Ping the API to send verification code to the user
  getCode(data: email): Observable<responseData> {
    return this._HttpClient.post<responseData>(
      `${Enviroment.BaseURL}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  //Ping the API with the verification code to reset the password
  FresetCode(data: Code): Observable<responseData> {
    // console.log(data);

    return this._HttpClient.post<responseData>(
      `${Enviroment.BaseURL}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  //Decode the user data from the token
  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('userToken'));

    this.decoded = jwtDecode<Decode | null>(token);

    this.userData.next(this.decoded);

    // console.log(this.userData.getValue());
  }

  //handle logout
  logOut() {
    localStorage.setItem('userToken', '');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  //Ping the API to update the user password
  resetMyPassword(data: LoginData): Observable<success> {
    return this._HttpClient.put<success>(
      `${Enviroment.BaseURL}/api/v1/auth/resetPassword`,
      data
    );
  }
}
