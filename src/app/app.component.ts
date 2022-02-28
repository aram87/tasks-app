import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks App';
  isLoggedIn = false;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  logout(): void {
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    return;
  }
}
