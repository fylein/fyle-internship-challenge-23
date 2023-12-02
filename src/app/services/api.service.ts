import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  getRepos(reposUrl: string): Observable<any[]> {
    return this.httpClient.get<any[]>(reposUrl);
  }

  getRepoLanguages(username: string, repoName: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/repos/${username}/${repoName}/languages`);
  }
}
