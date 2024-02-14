// src/app/app.component.ts
import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any = {};
  repositories: any[] = [];

  constructor(private apiService: ApiService) {}

  onSearch(username: string) {
    this.apiService.getUserRepos(username).subscribe(
      (repos) => {
        this.repositories = repos;
      },
      (error) => {
        console.error('Error fetching repositories:', error);
      }
    );

    this.apiService.getUserDetails(username).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
