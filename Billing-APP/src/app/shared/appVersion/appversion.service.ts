import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppversionService {
  //setting base url
  private API_URL = environment.API_URL + 'Account/version';

  constructor(private http: HttpClient) {}

  //Get app version number
  getVersion(): Observable<any> {
    let result;
    result = this.http.get(this.API_URL);
    return result;
  }
}
