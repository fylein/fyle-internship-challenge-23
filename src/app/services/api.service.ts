import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { repo, user } from '../types';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
      shareReplay(1),
      map((user:any) : user=>{
        return {
          login:user.login,
          name:user.name,
          avatar_url:user.avatar_url,
          html_url:user.html_url,
          location:user.location,
          email:user.email,
          followers:user.followers,
          following:user.following,
          public_repos:user.public_repos
        }
      })
    );
  }

  getRepos (username:string,page:string,perPage:string){    
    return this.httpClient.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`).pipe(
      shareReplay(1),
      map((repos:any) : repo[]=>{
          return repos.map((repo:any)=>{
            return {
              name:repo.name,
              html_url:repo.html_url,
              description:repo.description,
              topics:repo.topics
            }
          })
      })
    )
  }
}
