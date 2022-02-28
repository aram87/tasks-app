import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../responses/token-response';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService) { }

  saveSession(tokenResponse: TokenResponse) {

    window.localStorage.setItem('AT', tokenResponse.accessToken);
    window.localStorage.setItem('RT', tokenResponse.refreshToken);
    if (tokenResponse.userId) {
      window.localStorage.setItem('ID', tokenResponse.userId.toString());
      window.localStorage.setItem('FN', tokenResponse.firstName);
    }

  }

  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('AT')) {
      const tokenResponse: TokenResponse = {
        accessToken: window.localStorage.getItem('AT') || '',
        refreshToken: window.localStorage.getItem('RT') || '',
        firstName: window.localStorage.getItem('FN') || '',
        userId: +(window.localStorage.getItem('ID') || 0),
      };

      return tokenResponse;
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }

    // check if token is expired
    const jwtToken = JSON.parse(atob(session.accessToken.split('.')[1]));
    const tokenExpired = Date.now() > (jwtToken.exp * 1000);

    return !tokenExpired;

  }

  refreshToken(session: TokenResponse): Observable<TokenResponse> {

    return this.userService.refreshToken(session);
  }
  
}
