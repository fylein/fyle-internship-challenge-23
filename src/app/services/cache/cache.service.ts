import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollingService } from '../polling/polling.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(private PS: PollingService) {
    // Every 120s , cache is burst

    this.PS.startTimer().subscribe((data) => {
      this.apiCache = new Map();
    });
  }

  private apiCache: Map<string, any> = new Map();

  public get(cacheKey: string): any {
    let result = this.apiCache.get(cacheKey);
    return result;
  }
  public set(cacheKey: string, value: any): void {
    this.apiCache.set(cacheKey, value);
  }
  // Never use, except for tests
  public getCache = (): Map<string, any> => {
    return this.apiCache;
  };
}
