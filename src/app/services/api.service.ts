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
