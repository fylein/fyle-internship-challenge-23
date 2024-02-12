import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private accessToken = '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';

  constructor(private httpClient: HttpClient) { }

  getRepo(githubUsername: string, pageNo: number, perPage: number): Observable<any[]> {

    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

  
    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos?page=${pageNo}&per_page=${perPage}`, { headers })
      .pipe(
        catchError(error => {
          alert(`Profile not Found`);
          return throwError(error);
        })
      );
  }

  getUser(githubUsername: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `token ${this.accessToken}`
    });

    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`, { headers })
      .pipe(
        catchError(error => {
          console.warn(`Error fetching repositories:${error}`);
          return throwError(error);
        })
      );
  }
}
