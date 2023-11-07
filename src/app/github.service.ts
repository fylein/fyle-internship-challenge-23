import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  private username: string;
  private clientId = '162b6220302bba24b794';
  private clientSecret = 'b2859870711cdeda2419ae6662f378c65aa615c9';

  url = 'https://api.github.com/users/';

  constructor(private http: HttpClient) {
    this.username = '';
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 401) {
      return throwError(error.status);
    } else {
      return throwError(error.status || 'Server error');
    }
  }

  getUser(): Observable<any> {
    if (this.username) {
      return this.http
        .get(`${this.url}${this.username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        .pipe(
          map((res) => res),
          catchError(this.handleError)
        );
    } else {
      // Ensure that an observable is returned in all cases
      return throwError('Username is not provided.');
    }
  }
  getUserBio(username: string): Observable<any> {
    if (username) {
      return this.http
        .get(`${this.url}${username}`)
        .pipe(
          map((res) => res),
          catchError(this.handleError)
        );
    } else {
      return throwError('Username is not provided.');
    }
  }
  getRepos(): Observable<any[]> {
    if (this.username) {
      return this.http
        .get(`${this.url}${this.username}/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`)
        .pipe(
          map((res) => res as any[]),
          catchError(this.handleError)
        );
    } else {
      // Ensure that an observable is returned in all cases
      return throwError('Username is not provided.');
    }
  }

  updateUser(username: string) {
    this.username = username;
  }
}
