import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  setLastUsedUsername(username: string): void {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }
  getRepos(githubUsername: string, currentPage: number, pageSize: number = 10) {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${currentPage}&per_page=${pageSize}`;
    return this.httpClient.get(url);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
