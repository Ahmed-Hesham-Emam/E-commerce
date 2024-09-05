import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DoCheck,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'E-commerce';
  windowScrolled = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      {
        let toTopButton = document.querySelector('#to-top-button');

        window.addEventListener('scroll', () => {
          if (window.scrollY > 1500) {
            console.log('scrolling');

            toTopButton?.classList.remove('opacity-0');
          } else {
            toTopButton?.classList.add('opacity-0');
          }
        });
      }
    }
  }

  //Load the Flowbite library
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then((flowbite) => {
        callback(flowbite);
      });
    }
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
