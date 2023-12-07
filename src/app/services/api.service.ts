import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userData: Subject<GitHubUser> = new Subject<GitHubUser>();
  private reposCount: Subject<number> = new Subject<number>();
  // private username: Subject<string> = new Subject<string>();

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<GitHubUser> {
    return this.httpClient.get<GitHubUser>(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(username: string, currentPage: number, reposPerPage: number): Observable<GitHubRepository[]> {
    return this.httpClient.get<GitHubRepository[]>(
      `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`
    );
  }

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
}
