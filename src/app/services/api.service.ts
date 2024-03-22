import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(gitHubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${gitHubUsername}`, {
      headers: {
        'Authorization': `Bearer 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`
      }
    });
  }
  getAllRepo(gituser:string) {
    return this.httpClient.get(`https://api.github.com/users/${gituser}/repos`,{
      headers: {
        'Authorization': `Bearer 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`
      }
    });
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
