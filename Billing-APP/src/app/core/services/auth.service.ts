import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUserLogIn  ,IUserDetails, IUserRegisters, iUserRegisterResponse} from '../../shared/models/userdetails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //setting base url
  private API_URL = environment.API_URL ;

  //setting headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // show Authentication Service 
  authenticateUserService(userDetails : IUserLogIn): Observable<any> {
    const body = new HttpParams()
    .set('username', userDetails.username)
    .set('password', userDetails.password);
    return this.http.post<IUserDetails[]>(`${this.API_URL + 'Account/Login'}`,body,this.httpOptions);
  }
  
  //Register
  registeruser(userDetails : IUserRegisters): Observable<any> {
    this.API_URL = environment.API_URL + 'Account/register'
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Culture', 'en');
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<IUserDetails>(`${this.API_URL}`,userDetails, {
      headers
    });
  }
}
