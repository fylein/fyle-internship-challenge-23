import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // Getting users
  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  // Getting respective repositories
  getRepos(username: string){
    return this.httpClient.get(`https://api.github.com/users/${username}/repos`);
  }

  //Getting languages
  getLanguages(username: string, repoName: string){
    return this.httpClient.get(`https://api.github.com/repos/${username}/${repoName}/languages`);
  }

}
