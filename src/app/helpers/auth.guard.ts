import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ErrorResponse } from '../responses/error-response';
import { TokenResponse } from '../responses/token-response';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let session = this.tokenService.getSession();
    if (session == null) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.tokenService.isLoggedIn()) {

      console.log(`session is expired, let's renew the tokens`);
      // refresh token
      return this.checkSession(session);
    }
    return true;
  }

  checkSession(session: TokenResponse): Observable<boolean> {
    return this.tokenService.refreshToken(session).pipe(
      map(data => {
        console.log(`refreshToken repsonse is ${JSON.stringify(data)}`);
        this.tokenService.saveSession(data);
        return true;
      }),
      catchError((error: ErrorResponse) => {
        console.log(`inside checkSession ${JSON.stringify(error)}`);
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );

  }

}