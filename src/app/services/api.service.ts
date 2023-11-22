import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private httpClient: HttpClient ) { }

   getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);;
  }

  getRepos(githubUsername: string, pageIndex: number, perPage: number) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?&page=${pageIndex}&per_page=${perPage}`);
  }
}
