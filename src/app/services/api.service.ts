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
        `https://api.github.com/users/${githubUsername}?client_id=Iv1.29424d7ecd01280c&client_secret=96e5ec5cb21d46f7094c9c56fec3d213f0143425`,
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
      >(`https://api.github.com/users/${githubUsername}/repos?page=${pageNo}&per_page=${perPage}?client_id=Iv1.29424d7ecd01280c&client_secret=96e5ec5cb21d46f7094c9c56fec3d213f0143425`)
      .pipe(
        catchError((error) => {
          alert('Profile not Found');
          return throwError(error);
        }),
        delay(2000), // Introduce a 2-second delay
      );
  }
}
