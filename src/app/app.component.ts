import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { repos } from './shared/repos.model';

import './shared/repos.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  username: string = 'nithishrcta';
  user: any;

  repos_data: any;
  langs: any[] = [];

  repomodel: repos[] = [];
  flag: boolean = true;
  ngOnInit() {

   
    this.repomodel = this.apiService.reposs;
    this.loadrepo();
    this.username=''
   

  }

  search(inputValue: HTMLInputElement) {
    this.flag=true;
    this.repomodel.length = 0;
    this.username = inputValue.value;
    // this.repomodel = []
    this.loadrepo();
    //here we get access to the user basic data like name
  }

  loadrepo()
  {
    this.apiService.getUser(this.username).subscribe((data) => {
      this.user = data;
      console.log(this.user);
    },(error :any)=>
    {
      this.flag = false;
    });

    // get Repo data and languages used in those repo and bundle them in repos.model(for better data maintaince)

    this.apiService.getRepo(this.username).subscribe((data) => {
      this.repos_data = data;
      console.log(this.repos_data);

      this.repos_data.forEach((repo: any) => {
        this.apiService.getLang(repo).subscribe((data) => {
          this.langs = Object.keys(data);
          console.log(this.langs);
          this.apiService.stackrepos(repo, this.langs);
        });
      });
    });
  }
}
