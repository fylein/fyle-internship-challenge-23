import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, from, of } from 'rxjs';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private octokit: Octokit;

  constructor() {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  private apiCache: Map<string, any> = new Map();

  getUserBio(githubUsername: string) {
    let cacheKey = `GET /users/${githubUsername}`;
    let result = this.apiCache.get(cacheKey);

    if (result) {
      console.log(result);
      return of(result);
    }

    return from(this.octokit.request(`GET /users/${githubUsername}`)).pipe(
      tap((data) => {
        console.log(data);
        if (data instanceof Object) {
          this.apiCache.set(cacheKey, data);
        }
      })
    );
  }

  getUserRepos(githubUserName: string, noOfRepos: number, page: number) {
    let cacheKey = `GET /users/${githubUserName}/repos&pages=${page}&perpage=${noOfRepos}`;
    let result = this.apiCache.get(cacheKey);

    if (result) {
      console.log(result);
      return of(result);
    }

    return from(
      this.octokit.request(`GET /users/${githubUserName}/repos`, {
        per_page: noOfRepos,
        page,
      })
    ).pipe(
      tap((data) => {
        console.log(data);
        this.apiCache.set(cacheKey, data);
      })
    );
  }
}
