import { AppComponent } from './../../../app.component';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LoginData,
  RegisterData,
  success,
  fail,
  Decode,
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

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    //Store the last visited page in the session storage
    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        sessionStorage.setItem('currentPage', event.urlAfterRedirects);
      }
    });

    if (isPlatformBrowser(platformId)) {
      //Handle the case when the user refresh the page
      const lastVisitedPage = sessionStorage.getItem('currentPage');
      if (lastVisitedPage) {
        this._Router.navigate([lastVisitedPage]);
      } else {
        this._Router.navigate(['/']);
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

  //Decode the user data from the token
  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode<Decode | null>(token);
    this.userData.next(decoded);
    // console.log(this.userData.getValue());
  }

  //handle logout
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
