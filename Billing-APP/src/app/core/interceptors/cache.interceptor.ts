import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { interval, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../../shared/cache/http-cache.service';
import * as configData from '../../../assets/configuration/configuration.json';

const urlsObj = {
  request1: '/Policy/lookups',
  request2: '/Lookups/generalsetup',
};

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  isCacheEnable: any = configData.isCacheEnable == 'true' ? true : false;

  constructor(private cacheService: HttpCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // pass along non-cacheable requests and invalidate cache
    if (req.method !== 'GET') {
      console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    // attempt to retrieve a cached response

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url)!;

    // return cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && this.isCacheEnable) {
          for (const [key, value] of Object.entries(urlsObj)) {
            if (req.url.indexOf(value) > 0) {
              console.log(`Adding item to cache: ${req.url}`);
              this.cacheService.put(req.url, event);
            }
          }
        }
      })
    );
  }
}
