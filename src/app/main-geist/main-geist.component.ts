import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GitHubUser } from '../models/GitHubUser';
import { GithubApiService } from '../services/github-api.service';

@Component({
  selector: 'app-main-geist',
  templateUrl: './main-geist.component.html',
})
export class MainGeistComponent {
  // Input properties for component customization
  @Input() appTitle: string = '';
  @Input() appTheme: string = '';

  // Reference to the HTML element for scrolling
  @ViewChild('searchResultSection', { static: false })
  searchResultSection: ElementRef | null = null;

  // Input property for the username to search
  username: string = '';

  // State properties
  repos: any[] = [];
  totalRepoCount: number = 0;
  currentPage: number = 1;
  perPage: number = 10;
  isValidUser: boolean = false;
  searchClicked: boolean = false;
  searchedUser: GitHubUser | undefined;

  /**
   * @brief Method to reset state properties
   */
  private resetState(): void {
    this.repos = [];
    this.totalRepoCount = 0;
    this.currentPage = 1;
    this.isValidUser = false;
    this.searchedUser = undefined;
  }

  // Loading indicators
  loadingRepo: boolean = false;
  loadingUser: boolean = false;

  // Dropdown options for items per page
  itemsPerPageOptions: number[] = [10, 15, 25, 50, 100];

  // Constructor to inject GitHub service
  constructor(private githubService: GithubApiService) {}

  // Cache for storing previously searched results
  private resultCache: { [key: string]: any[] } = {};

  // Method to check if data is present in the cache
  private isDataInCache(
    username: string,
    page: number,
    perPage: number
  ): boolean {
    const key = `${username}_${page}_${perPage}`;
    return this.resultCache.hasOwnProperty(key);
  }

  // Method to retrieve data from the cache
  private getDataFromCache(
    username: string,
    page: number,
    perPage: number
  ): any {
    const key = `${username}_${page}_${perPage}`;
    return this.resultCache[key];
  }

  // Method to store data in the cache
  private setDataInCache(
    username: string,
    page: number,
    perPage: number,
    data: any
  ): void {
    const key = `${username}_${page}_${perPage}`;
    this.resultCache[key] = data;
  }

  /**
   * @brief Handles the user search process by calling the necessary functions.
   * @param result - Object containing user search result
   */
  searchUser(result: any): void {
    this.username = result.username;

    if (this.username.length) {
      this.searchClicked = true;

      // Reset state before initiating a new search
      this.resetState();

      // Initiates user details and repositories search
      this.searchUserDetails();
      this.searchUserRepositories();
    } else {
      window.alert('enter valid name');
    }
  }

  /**
   * @brief Retrieves user information from the GitHub service.
   */
  searchUserDetails(): void {
    this.loadingUser = true;
    this.githubService.getUserInfo(this.username).subscribe({
      next: (user: GitHubUser) => {
        // Updates user information on successful retrieval
        this.totalRepoCount = user.public_repos;
        this.searchedUser = user;
        this.isValidUser = true;
        this.loadingUser = false;
      },
      error: (error) => {
        // Handles errors in user information retrieval
        this.isValidUser = false;
        this.loadingUser = false;
        console.error('Error loading user details:', error);
        this.handleError('Error loading user details. Please try again.');
      },
    });
  }

  /**
   * @brief Retrieves user repositories from the GitHub service.
   */
  searchUserRepositories(): void {
    // Check if data is in the cache
    if (this.isDataInCache(this.username, this.currentPage, this.perPage)) {
      // Retrieve data from the cache
      this.repos = this.getDataFromCache(
        this.username,
        this.currentPage,
        this.perPage
      );
      this.loadingRepo = false;
      this.scrollToSearchResult();
    } else {
      // Data is not in the cache, make the API call
      this.loadingRepo = true;
      this.githubService
        .getUserRepos(this.username, this.currentPage, this.perPage)
        .subscribe({
          next: (repos) => {
            // Updates repository information on successful retrieval
            this.repos = repos;
            this.loadingRepo = false;
            this.scrollToSearchResult();

            // Cache the result for future use
            this.setDataInCache(
              this.username,
              this.currentPage,
              this.perPage,
              repos
            );
          },
          error: (error) => {
            // Handles errors in repository information retrieval
            this.repos = [];
            this.isValidUser = false;
            this.loadingRepo = false;
            this.scrollToSearchResult();
            console.error('Error loading repositories:', error);
            this.handleError('Error loading repositories. Please try again.');
          },
        });
    }
  }

  // Private method to handle errors by displaying an alert
  private handleError(errorMessage: string): void {
    console.log(errorMessage);
  }

  // Private method to scroll to the search result section
  private scrollToSearchResult(): void {
    if (this.searchResultSection && this.searchResultSection.nativeElement) {
      this.searchResultSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  /**
   * @brief Handles the change in items per page in the dropdown.
   * @param itemsPerPage - The number of items to display per page.
   */
  updateItemsPerPage(itemsPerPage: number): void {
    this.perPage = itemsPerPage;
    this.currentPage = 1;
    this.searchUserRepositories();
  }

  /**
   * @brief Handles the change in the current page.
   * @param page - The page number to navigate to.
   */
  updateCurrentPage(page: number): void {
    this.currentPage = page;
    this.searchUserRepositories();
  }
}
