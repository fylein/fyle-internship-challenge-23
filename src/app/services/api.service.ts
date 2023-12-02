import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUserProfile(githubUsername: string) {
    // Use HttpParams for query parameters
    const params = new HttpParams();
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`, { params });
  }

  getUserRepositories(githubUsername: string, page: number = 1, perPage: number = 10) {
    // Use HttpParams for query parameters
    const params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());

    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, { params });
  }

  // Implement additional methods as per requirements
}
