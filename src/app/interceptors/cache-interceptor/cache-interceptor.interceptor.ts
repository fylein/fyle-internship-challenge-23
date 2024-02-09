import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from 'src/app/services/cache-services/cache-service.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cacheService: CacheService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cacheService.get(request.urlWithParams);

    return cachedResponse ? of(cachedResponse) : this.newRequest(request, next);
  }
  newRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(request.urlWithParams, event, 10);
        }
      })
    )
  }
}
