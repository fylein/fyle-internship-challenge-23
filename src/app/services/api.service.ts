import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  user :any= {}
  repos :any = []
  total:number = 0
  searchVal : string = ''
  apiResults : any ={}
  testValue : string='test-value'
  shimmer:boolean = true

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  setUser(users : any){
    this.user = {...users}
    this.total = users.public_repos
  }

  setSearchVal(val:string){
    this.searchVal = val
  }

  getRepos(githubUsername: string ,options :any){
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`, {params:options});
  }

  setRepos(repos :any){
    this.repos = repos
  }

  getLanguages(githubUsername: string , repo: string){
    return this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repo}/languages`)
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
