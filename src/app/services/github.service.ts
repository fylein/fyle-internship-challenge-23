import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUrl = "https://api.github.com";

  constructor(private http: HttpClient) {}

  getUserRepos(userName: string, page: number, pageSize: number): Observable<HttpResponse<any[]>> {
    const apiURL = `${this.githubUrl}/users/${userName}/repos`;
    const params = {
      page: page.toString(),
      per_page: pageSize.toString()
    };
    const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    return this.http.get<any[]>(apiURL, {params, headers, observe: 'response'});

  }
}
