import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  repositories: any = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;
  profileData: any = [];
  githubUsername: string = 'johnpapa';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.isLoading = true;

    // Fetch user profile
    this.apiService.getUserProfile(this.githubUsername).subscribe({
      next: (profile) => {
        this.profileData = profile;
      },
      error: (error) => {
        console.error(error);
      },
    });

    // Fetch user repositories
    this.apiService.getUserRepositories(this.githubUsername, this.currentPage, this.itemsPerPage).subscribe({
      next: (repos) => {
        this.repositories = repos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getUserData();
  }

  onItemsPerPageChange(event: any) {
    const itemsPerPage = event.target.value;
    this.itemsPerPage = itemsPerPage;
    this.getUserData();
  }
}
