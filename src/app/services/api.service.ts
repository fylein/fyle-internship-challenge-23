import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  next: string = "";
  prev: string = "";
  last: string = "";
  first: string = "";

  // Octokit
  octokit = new Octokit({})

  constructor(
    private httpClient: HttpClient
  ) { }

  async getUser(githubUsername: string) {

    try {
      const result = await this.octokit.request('GET /users/{username}', {
        username: githubUsername,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      return result;
    }
    catch (error) {
      throw new Error("error")
    }
  }

  async getRepos(githubUsername: string, perpage: number) {

    let repos: object[] = [];

    try {
      let iterator = await this.octokit.paginate.iterator('GET /users/{username}/repos', {
        username: githubUsername,
        per_page: perpage,
      });
      for await (let response of iterator) {
        repos.push(response);
      }
      return repos;

    }
    catch (error) {
      throw new Error("error");
    }
  }

}