import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

@Injectable()
export class CacheService {
    constructor(private http: HttpClient) { }

    save(options: LocalStorageSaveOptions) {
        // Set default values for optionals
        options.expirationMins = options.expirationMins || 0

        // Set expiration date in miliseconds
        const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0

        const record = {
            value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
            expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
            hasExpiration: expirationMS !== 0 ? true : false
        }
        localStorage.setItem(options.key, JSON.stringify(record))
    }

    load(key: string) {
        // Get cached data from localstorage
        const item = localStorage.getItem(key)
        if (item !== null) {
            const record = JSON.parse(item)
            const now = new Date().getTime()
            // Expired data will return null
            if (!record || (record.hasExpiration && record.expiration <= now)) {
                return null
            } else {
                return JSON.parse(record.value)
            }
        }
        return null
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    cleanLocalStorage() {
        localStorage.clear()
    }

    public httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {

        // Setup default values
        options.body = options.body || null
        options.cacheMins = options.cacheMins || 0

        if (options.cacheMins > 0) {
            // Get data from cache
            const data = this.load(options.url)
            // Return data from cache
            if (data !== null) {
                return of<T>(data)
            }
        }

        return this.http.request<T>(verb, options.url, {
            body: options.body
        })
            .pipe(
                switchMap(response => {
                    if (options.cacheMins > 0) {
                        // Data will be cached
                        this.save({
                            key: options.url,
                            data: response,
                            expirationMins: options.cacheMins
                        })
                    }
                    return of<T>(response)
                })
            )
    }
}

export class LocalStorageSaveOptions {
    key: string = ''
    data: any
    expirationMins?: number
}

export class HttpOptions {
    url: string = ''
    body?: any
    cacheMins: number = 5
}