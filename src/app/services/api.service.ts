import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  getRepos(githubUsername: string, page: number, perPage: number) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`
    );
  }
}
