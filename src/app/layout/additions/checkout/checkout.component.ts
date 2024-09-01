import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  checkOut: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^\d{1,4}\s?[a-zA-Z\u0621-\u064A0-9\s]+,\s?[a-zA-Z\u0621-\u064A\s]+,\s?[a-zA-Z\u0621-\u064A\s]+,\s?\d{5}$/
      ),
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  CreditCard() {
    // if (this.checkOut.valid) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (id) => {
        this._OrdersService
          .getOrders(id.get('cartId')!, this.checkOut.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              // navigate to the payment gateway
              if ('session' in res) {
                window.open(res.session.url, '_self');
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
    // }
  }

  COD() {
    if (this.checkOut.valid) {
      this._ActivatedRoute.params.subscribe({
        next: (id) => {
          this._OrdersService
            .CashOrder(id['cartId']!, this.checkOut.value)
            .subscribe({
              next: (res) => {
                localStorage.setItem('sum', '0');
                this._Router.navigate(['/allorders']);
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
      });
    }
  }
}
