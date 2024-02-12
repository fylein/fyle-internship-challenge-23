import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Repo } from '../Model/repo';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUrl = "https://api.github.com";
  private repoCache: { [key: string]: Repo[] } = {};

  constructor(private http: HttpClient) {}

  getUser(userName: string): Observable<any> {
    return this.http.get<User>(`${this.githubUrl}/users/${userName}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserRepos(userName: string, page: number = 1, perPage: number = 10): Observable<Repo[]> {
    const cacheKey = `${userName}-${page}-${perPage}`;

    if (this.repoCache[cacheKey]) {
      return of(this.repoCache[cacheKey]);
    } else {
      const apiURL = `${this.githubUrl}/users/${userName}/repos`;
      const params = {
        page: page.toString(),
        per_page: perPage.toString()
      };
      const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
      
      return this.http.get<Repo[]>(apiURL, { params, headers }).pipe(
        map((repos) => {
          this.repoCache[cacheKey] = repos;
          return repos;
        }),
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = `Error: ${error.status}`;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
  
}
