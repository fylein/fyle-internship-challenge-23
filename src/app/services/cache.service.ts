import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PollingService } from './polling.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private octokit: Octokit;

  constructor(private PS: PollingService) {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
    });

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
