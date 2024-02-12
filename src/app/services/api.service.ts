import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 

  constructor(private httpClient: HttpClient) { }

  getRepo(githubUsername: string, pageNo: number, perPage: number): Observable<any[]> {

    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos?page=${pageNo}&per_page=${perPage}`)
      .pipe(
        catchError(error => {
          alert(`Profile not Found`);
          return throwError(error);
        })
      );
  }

  getUser(githubUsername: string): Observable<any> {

    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        catchError(error => {
          console.warn(`Error fetching repositories:${error}`);
          return throwError(error);
        })
      );
  }
}
