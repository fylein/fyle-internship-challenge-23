import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();

  constructor() { }

  set(key: string, value: HttpResponse<any>, validity: number) {
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + validity);
    this.cache.set(key, [expiry, value]);
  }

  get(key: string) {
    const cachedData = this.cache.get(key);

    if (!cachedData) {
      return null;
    }

    const expiry = cachedData[0];
    const httpResponse = cachedData[1];
    const currentTime = new Date();

    if (expiry && expiry.getTime() < currentTime.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return httpResponse;
  }
}
