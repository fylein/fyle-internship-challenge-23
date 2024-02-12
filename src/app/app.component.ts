import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  username: string = '';
  userData: any;
  repositories: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  loading: boolean = false;
  error: string = '';
  paginationArray: number[] = [];

  constructor(private apiService: ApiService) {}

  searchUser() {
    if (!this.username.trim()) {
      this.error = 'Please enter a valid GitHub username.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.apiService.getUser(this.username).subscribe(
      (data) => {
        console.log(data)
        this.userData = data;
        this.getRepositories();
        this.loading = false;
      },
      (error) => {
        this.error = 'Error fetching user data. Please try again later.';
        this.loading = false;
      }
    );
  }

  getRepositories() {
    this.apiService.getRepositories(this.username, this.currentPage, this.itemsPerPage).subscribe(
      (data: any[]) => {
        this.repositories = data;
        this.generatePaginationArray();
      },
      (error) => {
        console.error('Error fetching repositories:', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.paginationArray.length) {
      this.currentPage++;
      this.getRepositories();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRepositories();
    }
  }

  generatePaginationArray() {
    this.paginationArray = Array(Math.ceil(this.userData.public_repos / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getRepositories();
  }
}
