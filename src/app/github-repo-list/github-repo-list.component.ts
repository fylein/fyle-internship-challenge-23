import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-github-repo-list',
  templateUrl: './github-repo-list.component.html',
  styleUrls: ['./github-repo-list.component.scss'],
})
export class GithubRepoListComponent {

  constructor(private apiService: ApiService) { }

  username: string = '';
  repos: any[] = [];
  userDetails: any;
  searchPerformed: boolean = false; // Track if search has been performed
  loading: boolean = false; // Track loading state

  ngOnInit() {
  }

  getUserDetails(username: string) {
    this.loading = true; // Set loading flag to true
    this.apiService.getUser(username).subscribe(
      (user: any) => {
        this.userDetails = user;
        this.loading = false; // Set loading flag to false when API call is completed
      },
      (error) => {
        console.error(error);
        this.loading = false; // Set loading flag to false in case of error
      }
    );
  }

  getUserRepositories(username: string) {
    this.loading = true; // Set loading flag to true
    this.apiService.getRepos(username).subscribe(
      (repos: any) => {
        this.repos = repos as any[];
        this.loading = false; // Set loading flag to false when API call is completed
      },
      (error) => {
        console.error(error);
        this.loading = false; // Set loading flag to false in case of error
      }
    );
  }

  searchRepos() {
    this.getUserDetails(this.username);
    this.getUserRepositories(this.username);
    this.searchPerformed = true; // Set searchPerformed to true after searching
  }
}