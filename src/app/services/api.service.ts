import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, throwError } from 'rxjs';
import { User } from '../user';
import { Repo } from '../repo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  url: string = 'https://api.github.com/users';

  getUser(githubUsername: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/${githubUsername}`)
      .pipe(map(res => res));
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getRepos(githubUsername:string, perPage: number, page: number): Observable<Repo[]> {
    return this.httpClient
      .get<Repo[]>(`${this.url}/${githubUsername}/repos?per_page=${perPage}&page=${page}`)
      .pipe(map(res => res));
  }
}
