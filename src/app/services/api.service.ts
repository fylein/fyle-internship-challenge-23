import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, of, map } from 'rxjs';
import { Repo } from 'src/models/repo.model';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://api.github.com';
  private repoCache: { [key: string]: Repo[] } = {};

  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient
      .get<User>(`${this.url}/users/${githubUsername}`)
      .pipe(catchError(this.handleError));
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  getRepos(
    username: string,
    page: number = 1,
    perPage: number = 10
  ): Observable<any> {
    const cacheKey = `${username}-${page}-${perPage}`;

    if (this.repoCache[cacheKey]) {
      return of(this.repoCache[cacheKey]);
    } else {
      return this.httpClient
        .get<Repo[]>(
          `${this.url}/users/${username}/repos?page=${page}&per_page=${perPage}`
        )
        .pipe(
          map((repos) => {
            this.repoCache[cacheKey] = repos;
            return repos;
          }),
          catchError(this.handleError)
        );
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status}, ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
