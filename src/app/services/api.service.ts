import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, from, of } from 'rxjs';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private octokit: Octokit;
  constructor() {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  getUserEvents(githubUsername: string) {
    return from(
      this.octokit.request(`GET /users/${githubUsername}/events`, {
        username: githubUsername,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    );
  }

  getUserBio(githubUsername: string) {
    return from(this.octokit.request(`GET /users/${githubUsername}`));
  }
  //add pagenumber
  getUserRepos(githubUserName: string, noOfRepos: number, page: number) {
    return from(
      this.octokit.request(`GET /users/${githubUserName}/repos`, {
        per_page: noOfRepos,
        page,
      })
    ).pipe(tap((data) => console.log(data)));
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
