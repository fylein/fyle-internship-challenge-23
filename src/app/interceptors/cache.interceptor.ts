import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Check if the request is cacheable
    if (!req.method || req.method !== 'GET') {
      return next.handle(req);
    }

    // Check if the response is cached
    const cachedResponse = this.cache.get(req.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    // Forward the request to the next handler
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Cache the response
          this.cache.set(req.urlWithParams, event.clone());
        }
      })
    );
  }
}
