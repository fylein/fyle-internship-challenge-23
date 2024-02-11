import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent implements OnInit {
  user: any;
  repositories: any[] = [];
  errorMessage: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private apiService: ApiService) {
    this.user = this.apiService.user;
    this.totalItems = this.user.public_repos;
  }

  fetchRepositories() {
    this.apiService
      .getUserRepositories(this.user.login, this.currentPage, this.pageSize)
      .subscribe({
        next: (value: any) => {
          this.repositories = value;
          this.apiService.repos = this.repositories;
        },
        error: (err) => {
          this.repositories = [];
          this.errorMessage = 'Error fetch repositories!';
          console.log('API error : ', err);
        },
        complete: () => {
          console.log('Repositories fetched!');
        },
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.fetchRepositories();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.fetchRepositories();
  }

  ngOnInit(): void {
    this.fetchRepositories();
  }
}
