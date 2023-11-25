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

  title = 'fyle-frontend-challenge';
  input = '';
  gitHubUsername = '';

  user!: User;
  repos: Repo[] = [];
  perPage = 10;
  pageIndex = 1;

  ngOnInit() { }

  renderDetails() {
    if (!this.input) {
      this.clearInputs();
      return;
    }
    this.getUserDetails(this.input);
    this.gitHubUsername = this.input;
  }

  handlePageEvent(event: PageEvent) {
    this.perPage = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getUserRepos(this.user.login);
  }

  constructor(private api: ApiService) { }

  private clearInputs() {
    this.input = '';
    this.gitHubUsername = '';
    this.user = {} as User;
    this.repos = [];
  }

  private getUserDetails(username: string): void {
    this.api.getUser(username).subscribe({
      next: (response) => {
        this.user = response;
        this.getUserRepos(this.user.login);
      },
      error: (err) => { console.error('Error fetching user:', err); },
      complete: () => { console.log('Fetched user details successfully'); }
    });
  }

  private getUserRepos(username: string): void {
    this.api.getRepos(username, this.perPage, this.pageIndex).subscribe({
      next: (response) => { this.repos = response; },
      error: (err) => { console.error('Error fetching repos:', err); },
      complete: () => { console.log('Fetched repos successfully', this.repos); }
    });
  }
}
