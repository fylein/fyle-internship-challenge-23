import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  user: any;
  location: any;
  repositories: any[] = [];
  loading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalItems: number = 0;
  Math: any;

  constructor(private apiService: ApiService) {}

  searchUser(): void {
    this.loading = true;
  
    // Fetch user details first
    const repoDetailsObservable = this.apiService.getRepoDetails(this.username, this.username);
  
    if (repoDetailsObservable) {
      repoDetailsObservable.subscribe(
        (user: any) => {
          if (user && user.owner) {
            this.user = user;
  
            // Now, fetch all repositories with pagination
            this.apiService.getUserRepositories(this.username, this.currentPage, this.itemsPerPage).subscribe(
              (repos) => {
                this.repositories = repos;
                this.loading = false;
              },
              (error) => {
                console.error(error);
                this.loading = false;
              }
            );
          } else {
            console.error('Invalid user data received:', user);
            this.loading = false;
          }
        },
        (error: any) => {
          console.error(error);
          this.loading = false;
        }
      );
    } else {
      console.error('Observable is null or undefined');
      this.loading = false;
    }
  }
    
  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchUser();
  }
}
