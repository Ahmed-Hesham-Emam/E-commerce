import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //Create a variable to show the error message
  errorMSG!: string;

  //Create a variable to show the loading spinner
  Loading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
      ),
    ]),
  });

  //Ping the API to login the user
  submitEvent() {
    this.Loading = true;

    if (this.loginForm.valid) {
      this._AuthService.logIn(this.loginForm.value).subscribe({
        //Handle the response
        next: (res) => {
          // console.log(res);
          this.Loading = false;

          //Save the token in the local storage
          localStorage.setItem('userToken', res.token);

          //Decode the user data from the token
          this._AuthService.decodeUserData();

          //Navigate the user to the home page
          this._Router.navigate(['/home']);
        },

        //Handle the error
        error: (err) => {
          // console.log(err.error.message);

          //Show the error message to the user
          this.Loading = false;
          this.errorMSG = err.error.message;
        },
      });
    }
  }
}
