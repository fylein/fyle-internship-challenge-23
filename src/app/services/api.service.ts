import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { repos } from '../shared/repos.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
    // console.log(this.httpClient.get(`https://api.github.com/users`));
  }

  base_url = 'https://api.github.com/users/';
  reposs: repos[] = [];


  //services to get data (name , repo list , repo languages)
  getUser(githubUsername: string) {
    return this.httpClient.get(this.base_url + githubUsername);
  }
  getRepo(githubUsername: string) {
    return this.httpClient.get(`${this.base_url + githubUsername}/repos`);
  }
  getLang(repo: any) {
    return this.httpClient.get(
      `https://api.github.com/repos/${repo.full_name}/languages`
    );
  }

  // stackrepos(name :string , forks : any,visibility : string, url : string,watchers_count :any,langs : any[])


  //Strcturing the REPO DATA
  stackrepos(repos_data: any, langs: any[]) {

    
    this.reposs.push(
      new repos(
        repos_data.name,
        repos_data.forks,
        repos_data.visibility,
        repos_data.url,
        repos_data.watchers_count,
        langs
      )
    );
  }
}
