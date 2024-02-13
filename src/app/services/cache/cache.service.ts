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
      console.log(this.apiCache);
    });
  }

  private apiCache: Map<string, any> = new Map();
  get(cacheKey: string): Observable<any> {
    let result = this.apiCache.get(cacheKey);
    return result;
  }
  set(cacheKey: string, value: any): void {
    this.apiCache.set(cacheKey, value);
  }
}
