import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../requests/login-request';
import { SignupRequest } from '../requests/signup-request';
import { TokenResponse } from '../responses/token-response';
import { UserResponse } from '../responses/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/users/login`, loginRequest);
  }

  signup(SignupRequest: SignupRequest) {
    return this.httpClient.post(`${environment.apiUrl}/users/signup`, SignupRequest, { responseType: 'text'}); // response type specified, because the API response here is just a plain text (email address) not JSON
  }

  refreshToken(session: TokenResponse) {
    let refreshTokenRequest: any = {
      UserId: session.userId,
      RefreshToken: session.refreshToken
    };
    return this.httpClient.post<TokenResponse>(`${environment.apiUrl}/users/refresh_token`, refreshTokenRequest);
  }

  logout() {
    return this.httpClient.post(`${environment.apiUrl}/users/signup`, null);
  }

  getUserInfo(): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(`${environment.apiUrl}/users/info`);
  }

}