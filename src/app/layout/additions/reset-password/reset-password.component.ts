import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  // this is just horrible to look at, so i don't....

  formFlag: boolean = true;

  Loading: boolean = false;

  LoadingReset: boolean = false;

  message!: string;

  errorMSG!: string;

  errorMSG_Reset!: string;

  emailInput!: string;


  //Email Section Form group
  emailSection: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });


  //Code Section Form group
  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4,}$/),
    ]),
  });

  
  //password Section Form group
  PasswordReset: FormGroup = new FormGroup(
    {
      email: new FormControl(this.emailSection.get('email')?.value),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
        ),
      ]),

      rePassword: new FormControl(null, [Validators.required]),
    },
    this.rePasswordCheck
  );

  // check if the password and rePassword are matched
  rePasswordCheck(event: AbstractControl) {
    if (event.get('newPassword')?.value === event.get('rePassword')?.value) {
      return null;
    } else {
      event.get('rePassword')?.setErrors({ notMatched: true });
      return { notMatched: true };
    }
  }

  //Ping the API to send verification code to the user
  getCode() {
    this.Loading = true;
    if (this.emailSection.valid) {
      this._AuthService.getCode(this.emailSection.value).subscribe({
        next: (res) => {
          this.emailInput = this.emailSection.get('email')?.value;
          console.log(this.emailInput);

          this.message = res.message;

          this.Loading = false;
          this.PasswordReset.get('email')?.setValue(this.emailInput);
        },
        error: (err) => {
          this.errorMSG = err.error.message;
          // console.log(err.error.message);
          this.Loading = false;
        },
      });
    }
  }

  //Ping the API with the verification code to reset the password
  resetCodeEvent() {
    this.LoadingReset = true;
    if (this.resetCode.valid) {
      this._AuthService.FresetCode(this.resetCode.value).subscribe({
        next: (res) => {
          // console.log(res);

          this.LoadingReset = false;
          //change the form flag to show the second form for entering the new password
          this.formFlag = false;
        },
        error: (err) => {
          console.log(err);

          this.LoadingReset = false;
          // console.log(err.error.message);
          this.errorMSG_Reset = err.error.message;
        },
      });
    }
  }

  //Ping the API with the new password to reset it

  newPasswordEvent() {
    this.LoadingReset = true;
    // this.PasswordReset.get('email')?.setValue(this.emailInput);

    if (this.PasswordReset.valid) {
      // console.log(this.PasswordReset.value);

      this._AuthService.resetMyPassword(this.PasswordReset.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.LoadingReset = false;
          // this._Router.navigate(['/login']);

          //Save the token in the local storage
          localStorage.setItem('userToken', res.token);

          //Decode the user data from the token
          this._AuthService.decodeUserData();

          //Navigate the user to the home page
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.LoadingReset = false;
          this.errorMSG_Reset = err.error.message;
          // console.log(err);
        },
      });
    }
  }
}
