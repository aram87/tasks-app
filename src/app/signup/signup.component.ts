import { Component, OnInit } from '@angular/core';
import { SignupRequest } from '../requests/signup-request';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequest: SignupRequest = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    ts: new Date().toISOString()
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(JSON.stringify(this.signupRequest));

    this.userService.signup(this.signupRequest).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
