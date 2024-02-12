import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private octokit: Octokit;

  constructor() {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
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
