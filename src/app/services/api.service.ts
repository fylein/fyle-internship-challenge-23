import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient
      .get(
        `https://api.github.com/users/${githubUsername}`,
      )
      .pipe(
        catchError((error) => {
          console.warn(`Error fetching repositories:${error}`);
          return throwError(error);
        }),
        delay(2000), // Introduce a 2-second delay
      );
  }

  getRepos(githubUsername: string, pageNo: number, perPage: number) {
    return this.httpClient
      .get<
        any[]
      >(`https://api.github.com/users/${githubUsername}/repos?page=${pageNo}&per_page=${perPage}`)
      .pipe(
        catchError((error) => {
          alert('Profile not Found');
          return throwError(error);
        }),
        delay(2000), // Introduce a 2-second delay
      );
  }
}
