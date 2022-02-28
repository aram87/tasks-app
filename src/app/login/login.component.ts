import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../requests/login-request';
import { ErrorResponse } from '../responses/error-response';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    email: "",
    password: ""
  };

  isLoggedIn = false;
  isLoginFailed = false;
  error: ErrorResponse = { error: '', errorCode: 0 };
  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    let isLoggedIn = this.tokenService.isLoggedIn();
    console.log(`isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      this.isLoggedIn = true;

      this.router.navigate(['tasks']);
    }
  }

  onSubmit(): void {

    this.userService.login(this.loginRequest).subscribe({
      next: (data => {
        console.debug(`logged in successfully ${data}`);
        this.tokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.reloadPage();
      }),
      error: ((error: ErrorResponse) => {
        this.error = error;
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      })

    });
  }
  reloadPage(): void {
    window.location.reload();
  }


}
