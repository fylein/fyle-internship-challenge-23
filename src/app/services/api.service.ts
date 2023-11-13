import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { GitHubUser } from '../shared/git-hub-user-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public userName = "";
  public userDetail: any;
  private gitURL = 'https://api.github.com/users/'
  constructor(
    private httpClient: HttpClient,
  ) { }

  getUser(githubUsername: string): Observable<GitHubUser> {
    return this.httpClient.get<GitHubUser>(this.gitURL + githubUsername);
  }
  getRepoDetails(githubUsername: string): Observable<any> {
    return this.httpClient.get(this.gitURL + githubUsername + "/repos");
  }

}