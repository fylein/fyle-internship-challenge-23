import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { User } from './user';
import { Repo } from './repo';
import { PageEvent } from '@angular/material/paginator';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'fyle-frontend-challenge';

  input!: string;
  // input: string = 'fds';
  gitHubUsername: string = '';

  ngOnInit() {
    // this.getUser('pmndrs');
  }

  renderDetails() {
    // if (this.input === '') {
    //   this.input = '';
    //   this.gitHubUsername = '';
    //   return;
    // }
    this.getUser(this.input);
    this.gitHubUsername = this.input;
  }

  handlePageEvent(event: PageEvent) {
    this.perPage = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getRepos(this.user.login);
    console.log('handlePageEvent(): ', event);
  }

  constructor(private api: ApiService) { }

  user!: User;
  repos: Repo[] = [];
  perPage = 10;
  pageIndex = 1;


  getUser(username: string): void {
    if (username === undefined) {
      return;
    }
    this.api.getUser(username).subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
        this.getRepos(this.user.login);
      },
      error: (err) => { console.log(err) },
      complete: () => {
        console.log('Fetched user details successfully')
      }
    });
  }

  getRepos(username: string): void {
    if (username === undefined) {
      return;
    }
    this.api.getRepos(username, this.perPage, this.pageIndex).subscribe({
      next: (response) => {
        this.repos = response
      },
      error: (err) => { console.log(err) },
      complete: () => {
        console.log("Fetched repos successfully");
        console.log('Repos: ', this.repos);
      }
    })
  }

}
