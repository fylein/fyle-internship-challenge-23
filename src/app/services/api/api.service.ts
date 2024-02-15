import { Injectable } from '@angular/core';
import { tap, throwError, from, of, Observable } from 'rxjs';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private octokit: Octokit;

  constructor(private cache: CacheService) {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  getUserBio(githubUsername: string): Observable<any> {
    let cacheKey = `GET /users/${githubUsername}`;
    let result = this.cache.get(cacheKey);

    if (result) {
      return of(result);
    }

    return from(this.octokit.request(`GET /users/${githubUsername}`)).pipe(
      tap((data) => {
        if (data instanceof Object) {
          this.cache.set(cacheKey, data);
        }
      }),
      catchError((error) => {
        console.error('Err:', error);
        return throwError('User bio failed');
      })
    );
  }

  getUserRepos(
    githubUserName: string,
    noOfRepos: number,
    page: number
  ): Observable<any> {
    let cacheKey = `GET /users/${githubUserName}/repos?per_page=${noOfRepos}&pages=${page}`;
    let result = this.cache.get(cacheKey);

    if (result != undefined) {
      return of(result);
    }

    return from(
      this.octokit.request(`GET /users/${githubUserName}/repos`, {
        per_page: noOfRepos,
        page,
      })
    ).pipe(
      tap((data) => {
        if (data instanceof Object) {
          this.cache.set(cacheKey, data);
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError('User RepoData request failed');
      })
    );
  }

  // For TESTING only

  returnOctokit(): Octokit {
    return this.octokit;
  }
}
