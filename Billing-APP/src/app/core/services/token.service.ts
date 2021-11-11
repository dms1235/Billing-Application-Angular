import { Injectable, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { IBorder } from '../../shared/models/border';
import { IUserDetails } from '../../shared/models/userdetails';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

const TOKEN_KEY = 'auth-token';
let USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) { }

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IUserDetails {
    const userDetails = localStorage.getItem(USER_KEY);
    return userDetails != null ? JSON.parse(userDetails) : null;
  }

  // Check token is expire or not
  public isTokenExpire(): boolean {
    let userData = this.getUser();
    if (userData) {
      var todayDate = new Date();
      if (todayDate < new Date(userData.ExpireDate) && Boolean(localStorage.getItem('loggedIn'))) {
        return false;
      }
    }
    return true;
  }

  // check user is login or not 
  public isUserIsLogin(): boolean {
    let checkvalue = Boolean(localStorage.getItem('loggedIn'));
    if (checkvalue != null && checkvalue != undefined) {
      return checkvalue;
    }
    return false;
  }
}
