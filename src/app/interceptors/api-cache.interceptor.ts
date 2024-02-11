import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ApiCacheService } from '../services/api-cache.service';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {
  constructor(private apiCacheService: ApiCacheService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cachedResponse = this.apiCacheService.get(request);

    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.apiCacheService.set(request, event);
        }
      })
    );
  }
}
