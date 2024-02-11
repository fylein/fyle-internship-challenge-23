import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // Getting users
  getUser(githubUsername: string): Observable<any> {
    const userObservable = this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
    const reposObservable = this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);

    return forkJoin([userObservable, reposObservable]).pipe(
      map(([user, repos]) => {
        return {
          user: user,
          repos: repos
        };
      })
    );
  }

  //Getting languages
  getLanguages(username: string, repoName: string){
    return this.httpClient.get(`https://api.github.com/repos/${username}/${repoName}/languages`);
  }

}
