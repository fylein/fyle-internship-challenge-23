import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-repository-list',
  templateUrl: './github-repository-list.component.html',
  styleUrls: ['./github-repository-list.component.scss']
})
export class GithubRepositoryListComponent {




  username: any;
  users: any;
  language: any;
  repos: any[] = [];

  pageItems: any[] = [];
  pageSize: number = 10;
  currentPages: number = 1;
  loader = true;
  totalcount = 10;

  constructor(private gitHubService: ApiService, private route: ActivatedRoute) {

    this.route.paramMap.subscribe((users)=>
    {
      this.username = users.get('user');
      this.updatePages();
      this.updatePageItems();
      
    });

  }


  updatePageItems() {
    const startIndex = (this.currentPages - 1) * this.pageSize;
    this.pageItems = this.repos.slice(startIndex, startIndex + this.pageSize);
  }

  pageChanges(event: any) {
    this.currentPages = event;
    this.updatePageItems();
  }



  updatePages() {

    this.gitHubService.getUser(this.username).subscribe((data) => {
      setTimeout(() => {
        this.users = data
        this.loader = false;
      }, 1000);
      
    })

    this.gitHubService.getRepos(this.username).subscribe((data) => {
      console.log(data);
      this.repos = data;
      this.updatePageItems();
    })
  }

  updatePage(event: any) {
    this.username = event;
    this.updatePages();
  }

 




}
