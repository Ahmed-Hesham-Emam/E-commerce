import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  //Just becuse Angular does't like my icons wither it's inside <i> or <svg> it just hates font Awesome icons i guess
  host: {ngSkipHydration: 'true'},
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public _AuthService: AuthService) {}

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
}
