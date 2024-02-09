import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface GitHubUser {
  name: string;
  bio: string;
  location: string;
  twitter_username: string;
  html_url: string;
  avatar_url: string;
  public_repos: number
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string;
  topics: string[];
  html_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userData: Subject<GitHubUser> = new Subject<GitHubUser>();
  private reposCount: Subject<number> = new Subject<number>();
  private error404Subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': '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'
    });
  }

  getUser(githubUsername: string): Observable<GitHubUser> {
    const headers = this.getHeaders();
    return this.httpClient.get<GitHubUser>(
      `https://api.github.com/users/${githubUsername}`,
      {
        headers: headers
      }
    );
  }

  getRepos(username: string, currentPage: number, reposPerPage: number): Observable<GitHubRepository[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<GitHubRepository[]>(
      `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`,
      {
        headers: headers
      }
    );
  }

  // getUser(githubUsername: string): Observable<GitHubUser> {
  //   // const headers = this.getHeaders();
  //   return this.httpClient.get<GitHubUser>(
  //     `https://api.github.com/users/${githubUsername}`
  //   );
  // }

  // getRepos(username: string, currentPage: number, reposPerPage: number): Observable<GitHubRepository[]> {
  //   // const headers = this.getHeaders();
  //   return this.httpClient.get<GitHubRepository[]>(
  //     `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`
  //   );
  // }

  getUserData(): Observable<GitHubUser> {
    return this.userData.asObservable();
  }
  
  setUserData(user: GitHubUser): void {
    this.userData.next(user);
    this.reposCount.next(user.public_repos);
  }

  getReposCount(): Observable<number> {
    return this.reposCount.asObservable();
  }

  getError404Status(): Observable<boolean> {
    return this.error404Subject.asObservable();
  }

  setError404Status(status: boolean): void {
    this.error404Subject.next(status);
  }
}
