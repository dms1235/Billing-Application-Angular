import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TokenService } from './../services/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;
  private totalRequests = 0;
  constructor(public token: TokenService, private spinner: NgxSpinnerService) {
    this.urlsToNotUse = ['Account/token'];
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.spinner.show();
    let authReq = req;
    if (this.isValidRequestForInterceptor(req.url)) {
      const token = this.token.getToken();
      if (token != null) {
        authReq = req.clone({
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
        });
      } // return next.handle(authReq);
    }
    return next.handle(authReq).pipe(
      catchError((err) => {
        this.spinner.hide();
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          // console.log(
          //   'auto logout if 401 Unauthorized or 403 Forbidden response returned from api'
          // );
          this.token.signOut();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })).pipe(finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.spinner.hide();
        }
      }));
  }
  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(
        position + positionIndicator.length
      );
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}

export const HttpRequestInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
