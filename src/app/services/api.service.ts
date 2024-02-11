import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { ApiCacheService } from './api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  user: any;
  repos: any;
  constructor(
    private httpClient: HttpClient,
    private apiCacheService: ApiCacheService
  ) {}

  getUser(githubUsername: string) {
    const url = `https://api.github.com/users/${githubUsername}`;
    const req = new HttpRequest('GET', url, { responseType: 'json' });
    const cachedResponse = this.apiCacheService.get(req);
    if (cachedResponse) {
      console.log('cached user : ', cachedResponse.body);
      return new Observable((observer) => {
        observer.next(cachedResponse.body);
        observer.complete();
      });
    }
    return this.httpClient.get(url);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getUserRepositories(githubUsername: string, page: number, per_page: number) {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${per_page}`;

    const req = new HttpRequest('GET', url, {
      responseType: 'json',
    });
    const cachedResponse = this.apiCacheService.get(req);
    if (cachedResponse) {
      console.log('cached repo : ', cachedResponse.body);
      return new Observable((observer) => {
        observer.next(cachedResponse.body);
        observer.complete();
      });
    }
    return this.httpClient.get(url);
  }
}
