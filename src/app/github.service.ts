import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private baseUrl = 'https://api.github.com';
  private repositoriesCache: { [username: string]: Observable<any[]> } = {};

  constructor(private http: HttpClient) {}

  getRepositories(username: string): Observable<any[]> {
    if (!username || !username.trim()) {
      return throwError(() => new Error('Please enter a valid GitHub username.'));
    }

    // Check if repositories for this username are already cached
    if (this.repositoriesCache[username]) {
      return this.repositoriesCache[username];
    }

    const url = `${this.baseUrl}/users/${username}/repos`;

    const repositories$ = this.http.get<any[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );

    // Cache repositories for the username
    this.repositoriesCache[username] = repositories$;
    return repositories$;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

