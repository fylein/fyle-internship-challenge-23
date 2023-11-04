import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, Observable } from 'rxjs';

interface Repository {
  id: number;
  name: string;
}

interface Tag {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getRepos(githubUsername: string): Observable<Repository[]> {
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos?page=1&per_page=6`);
  }

  getLanguages(url: string): Observable<Tag[]> {
    return this.httpClient.get<any[]>(url);
  }
}
