import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),

    // importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        errorInterceptor,
        spinnerInterceptor,
      ])
    ),
    importProvidersFrom(
      RouterModule,
      BrowserAnimationsModule,
      ToastrModule,
      NgxSpinnerService,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
