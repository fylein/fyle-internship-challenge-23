import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  getUser(username: string) {
    return this.httpClient.get(`https://api.github.com/users/${username}`).pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return throwError('Error fetching user data. Please try again later.');
      })
    );
  }

  getRepositories(username: string, page: number, perPage: number) {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        console.log(data)
        if (Array.isArray(data)) {
          return data.map(repo => ({
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description
            // Add more properties as needed
          }));
        } else {
          throw new Error('Invalid response data.');
        }
      }),
      
      catchError(error => {
        console.error('Error fetching repositories:', error);
        return throwError('Error fetching repositories. Please try again later.');
      })
    );
  }
}

