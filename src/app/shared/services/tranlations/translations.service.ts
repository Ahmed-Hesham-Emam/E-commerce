import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  defaultLanguage = 'en';
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object, // Using PLATFORM_ID for platform checks
    private _translateService: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Get the current language from the local storage
      let currentLanguage = localStorage.getItem('language');

      if (currentLanguage) {
        this.defaultLanguage = currentLanguage;
      }

      // Set the default language for the application
      this._translateService.setDefaultLang(this.defaultLanguage);
      this._translateService.use(this.defaultLanguage);

      this.changeDirection(this.defaultLanguage);
    }
  }

  // Change the page direction based on the selected language
  changeDirection(language: string) {
    if (this.isBrowser) {
      if (language === 'ar') {
        document.dir = 'rtl';
      } else {
        document.dir = 'ltr';
      }
    }
  }

  // Change the language of the application
  changeLanguage(language: string) {
    if (this.isBrowser) {
      localStorage.setItem('language', language);

      this._translateService.setDefaultLang(language);
      this._translateService.use(language);

      this.changeDirection(language);
    }
  }
}
