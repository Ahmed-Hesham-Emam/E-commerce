import { Component, DoCheck, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsService } from '../../../shared/services/tranlations/translations.service';
import { cart } from '../../../shared/interfaces/cart';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  //Just becuse Angular does't like my icons wither it's inside <i> or <svg> it just hates font Awesome icons i guess
  host: { ngSkipHydration: 'true' },
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = false;
  total!: string;
  platformId: Object;
  icon!: string;
  sumResult!: number;

  constructor(
    private _TranslationsService: TranslationsService,
    @Inject(PLATFORM_ID) platformId: Object,
    public _AuthService: AuthService,
    private _CartService: CartService
  ) {
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
      }

      if (localStorage.getItem('language') == 'en') {
        this.icon = 'assets/images/flag-icon-GB.png';
      } else if (localStorage.getItem('language') == 'ar') {
        this.icon = 'assets/images/flag-icon-EG.png';
      } else if (localStorage.getItem('language') == 'bg') {
        this.icon = 'assets/images/flag-icon-BG.png';
      }

      if (localStorage.getItem('userToken') !== '') {
        this._CartService.getCart().subscribe({
          next: (res) => {
            // console.log(res.data);

            this.sumResult = 0;
            for (let i = 0; i < res.data.products.length; i++) {
              this.sumResult += res.data.products[i].count;
            }
            localStorage.setItem('sum', this.sumResult.toString());
          },
        });
      }
    }
  }

  ngDoCheck(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.total = JSON.parse(localStorage.getItem('sum') || '0');
    }
  }

  ngOnInit(): void {
    //Check if the user is logged in or not
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  changeLanguage(language: string) {
    this._TranslationsService.changeLanguage(language);
  }
}
