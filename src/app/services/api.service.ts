import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BASE_URL, USER_SEARCH_URL } from '../../core/constants/api-url-constant';
import { CacheService } from './cache-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = BASE_URL
  userSearchUrl = USER_SEARCH_URL

  constructor(
    private http: HttpClient, private cacheService: CacheService 
  ) { }

  getGithubUserDetails(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.userSearchUrl}/${userName}`).pipe(
      catchError(this.handleResponse())
    );
  }

  getUserRepos(url: string, page: number, perPage: number): Observable<any> {
    const cacheKey = `${url}_page${page}_perPage${perPage}`;
    const cachedData = this.cacheService.get(cacheKey);

    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get(`${url}?page=${page}&per_page=${perPage}`).pipe(
        tap(data => this.cacheService.set(cacheKey, data)),
        catchError(this.handleResponse())
      );
    }
  }

  private handleResponse<T>() {
    return (error: any) => {
      console.error('API Error:', error);
      return of(null); // Returning null or any other default value based on your use case
    };
  }


  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
