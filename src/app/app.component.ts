import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/additions/navbar/navbar.component';
import { FooterComponent } from './layout/additions/footer/footer.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    NgxSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'E-commerce';
  lastVisitedPage: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private spinner: NgxSpinnerService
  ) {}

  //Load the Flowbite library
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then((flowbite) => {
        callback(flowbite);
      });
    }
  }
}
