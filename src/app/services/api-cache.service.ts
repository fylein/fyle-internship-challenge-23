import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCacheService {
  private cache = new Map<string, HttpResponse<any>>();
  constructor() {}

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    const key = request.urlWithParams;
    return this.cache.get(key);
  }

  set(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const key = request.urlWithParams;
    this.cache.set(key, response);
  }
}
