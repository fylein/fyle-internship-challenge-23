import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  private apiUrl = 'https://api.github.com';
  private clientid = 'Iv1.7172eb26f59d1a25';
  private clientsecret = '201d972a3502f885fe2fd677f9ad5c2c86033741';
  private username: string = '';

  constructor(private http: HttpClient) {
    console.log("service is now ready!");
  }

  getProfileInfo(): Observable<any> {
    return this.http.get(${this.apiUrl}/users/${this.username}?client_id=${this.clientid}&client_secret=${this.clientsecret});
  }

  getProfileRepos(page: number, pageSize: number): Observable<any> {
    const url = ${this.apiUrl}/users/${this.username}/repos?client_id=${this.clientid}&client_secret=${this.clientsecret}&page=${page}&per_page=${pageSize};
    return this.http.get(url);
  }

  updateProfile(username: string): void {
    this.username = username;
  }
}
