import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {

  repositories: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getRepos('torvalds');
  }

  // getRepos(githubUsername: string) {
  //   this.apiService.getRepos(githubUsername).subscribe((repos: any[]) => {
  //     console.log(repos);
  //   });
  // }

  getRepos(githubUsername: string) {
    this.apiService.getRepos(githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        console.log(repos);
      },
      error: (err) => {
        console.error('Error fetching repositories:', err);
      }
    });
  }
}
