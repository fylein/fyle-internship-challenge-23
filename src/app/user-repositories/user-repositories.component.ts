// src/app/user-repositories/user-repositories.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent implements OnInit {
  @Input() user: any;
  @Input() repositories: any[] = [];
  loading = true; // Set initial loading state to true

  // Pagination properties
  pageSizeOptions = [10, 25, 100];
  pageSize = 10; // Set the default number of items per page to 10
  currentPage = 1;


  languageImages: { [key: string]: string } = {
    'JavaScript': '/assets/images/js-logo.png',
    'TypeScript': '/assets/images/ts-logo.png',
    'Python': '/assets/images/py-logo.png',
    'C++': '/assets/images/c++-logo.png',
    'HTML': '/assets/images/html-logo.png',
    // Add more language-image pairs as needed
  };


  // Getter for paginated repositories
  get paginatedRepositories(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.repositories.slice(startIndex, endIndex);
  }

  // Handle page change event
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
  }

  getUserGitHubUrl(): string {
    return `https://github.com/${this.user.login}`;
  }

  ngOnInit() {
    // Simulate data loading
    setTimeout(() => {
      this.loading = false;
    }, 4000); // Adjust the timeout as needed
  }
}
