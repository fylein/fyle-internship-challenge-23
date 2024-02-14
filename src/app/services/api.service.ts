// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.github.com/users/';

  constructor(private http: HttpClient) {}

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${username}/repos`);
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${username}`);
  }
}
