import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com'; // GitHub API base URL

  constructor(private http: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${githubUsername}`);
  }

  getUserRepo(username: string): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`; // Endpoint to fetch user repositories
    return this.http.get<any[]>(url); // Return the observable directly
  }
}
