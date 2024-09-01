import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  //Create a variable to show the error message
  errorMSG!: string;

  //Create a variable to show the loading spinner
  Loading: boolean = false;

  //Create a variable to store the subscription
  Subscription: Subscription = new Subscription();

  //Create a reactive form for the register
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
        ),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.rePasswordMatch
  );

  //Check if the password and rePassword are matched
  rePasswordMatch(event: AbstractControl) {
    if (event.get('password')?.value === event.get('rePassword')?.value) {
      return null;
    } else {
      event.get('rePassword')?.setErrors({ notMatched: true });
      return { notMatched: true };
    }
  }

  //Ping the API to register the user
  submitEvent() {
    this.Loading = true;

    if (this.registerForm.valid) {
      this.Subscription = this._AuthService
        .signUp(this.registerForm.value)
        .subscribe({
          //Handle the response
          next: (res) => {
            this.Loading = false;
            // console.log(res);

            //Save the token in the local storage
            localStorage.setItem('userToken', res.token);

            //Decode the user data from the token
            this._AuthService.decodeUserData();

            //Navigate to the home page
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
