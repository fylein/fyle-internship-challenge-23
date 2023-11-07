// github-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  user: any;
  username!: string;
  userBio: any;
  repos: any[];
  displayedRepos: any[] = [];
  pageSize = 10;
  currentPage = 1;

  constructor(private githubService: GithubService, private router: Router) {
    this.user = false;
    this.repos = [];
  }

  getUserBio() {
    this.githubService.getUserBio(this.username).subscribe(
      (user: any) => {
        // Check if the 'bio' property exists in the response
        if (user.bio) {
          this.userBio = user.bio;
        } else {
          this.userBio = 'Bio not available';
        }
      },
      (error: any) => {
        console.error('Error fetching user bio:', error);
        this.userBio = 'Bio not available';
      }
    );
  }

  isLoading: boolean = false; // Initially, set it to false

  searchUser() {
  // Set isLoading to true when API calls start
  this.isLoading = true;

  this.githubService.updateUser(this.username);

  this.githubService.getUser().subscribe(
    (user: any) => {
      this.user = user;
      this.router.navigate(['/profile']);
      this.getUserBio();
      // Set isLoading to false when API calls complete
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching user data:', error);

      // Ensure isLoading is set to false even on error
      this.isLoading = false;
    }
  );

  this.githubService.getRepos().subscribe(
    (repos: any[]) => {
      this.repos = repos;
      this.updateDisplayedRepos();

      // Set isLoading to false when API calls complete
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching repositories:', error);

      // Ensure isLoading is set to false even on error
      this.isLoading = false;
    }
  );
}

  ngOnInit() {
  }

  updateDisplayedRepos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedRepos = this.repos.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedRepos();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.updateDisplayedRepos();
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedRepos();
  }

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.repos.length / this.pageSize) }, (_, i) => i + 1);
  }

  
}
