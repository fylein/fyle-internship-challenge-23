import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<any> {
    if (!this.cache.has(username)) {
      const user$ = this.http.get(`https://api.github.com/users/${username}`).pipe(
        catchError(() => {
          this.cache.delete(username);
          return of(null);
        }),
        shareReplay(1)
      );
      this.cache.set(username, user$);
    }
    return this.cache.get(username) || of(null); // Handle the case when the value is undefined
  }

  getRepos(username: string, page: number, pageSize: number): Observable<any[]> {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;
    return this.http.get<any[]>(url);
  }
}
