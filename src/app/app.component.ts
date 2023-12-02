import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  userDetails: any;
  userRepos: any[] = [];
  userName: string = '';
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  searchUser(userName: string) {
    this.userName = userName;
    this.currentPage = 1;
    this.fetchUserDetails(this.userName);
  }

  ngOnInit() {
    this.fetchUserDetails(this.userName);
  }

  fetchUserDetails(name: string) {
    if(name === '') {
      return;
    }

    this.resetState(); // Reset state on every new search

    this.isLoading = true;
    this.apiService.getUser(this.userName).subscribe(
      (data: any) => {
        this.userDetails = data;
        this.totalItems = data.public_repos;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.fetchUserRepos(data.repos_url, this.currentPage, this.itemsPerPage);
      },
      (error: any) => {
        this.handleError(error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  fetchUserRepos(reposUrl: string, page: number, itemsPerPage: number) {
    const startIndex = (page - 1) * itemsPerPage;
    const apiUrl = `${reposUrl}?page=${page}&per_page=${itemsPerPage}`;
    this.apiService.getRepos(apiUrl).subscribe(
      (repos: any[]) => {
        this.userRepos = repos;
        this.loadLanguagesForRepos();
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  loadLanguagesForRepos() {
    for (const repo of this.userRepos) {
      this.apiService.getRepoLanguages(this.userName, repo.name).subscribe(
        (languages: any) => {
          repo.languages = Object.keys(languages);
        },
        (error: any) => {
          this.handleError(error);
        }
      );
    }
  }

  handlePageChange(action: string | number) {
    if (action === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    } else if (action === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    } else if (typeof action === 'number' && action >= 1 && action <= this.totalPages) {
      this.currentPage = action;
      this.fetchUserRepos(this.userDetails.repos_url, this.currentPage, this.itemsPerPage);
    }
  }

  calculateTotalPages(totalItems: number, itemsPerPage: number): number[] {
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateItemsPerPage(itemsPerPage: number) {
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.fetchUserDetails(this.userName);
  }

  updateUserName() {
    this.currentPage = 1;
    this.fetchUserDetails(this.userName);
  }

  changeNameAndFetchData(newName: string) {
    this.userName = newName;
    this.updateUserName();
  }

  resetState() {
    this.errorMessage = null;
    this.userDetails = null;
    this.userRepos = [];
    this.totalPages = 0;
    this.totalItems = 0;
    this.currentPage = 1;
  }

  handleError(error: any) {
    console.log({error});

    if(error.error.message === 'Not Found') {
      this.errorMessage = 'Please enter the correct Github Username.';
    } else {
      this.errorMessage = error.message;
    }

    alert(this.errorMessage);
    this.isLoading = false;
    this.userName = '';
    this.resetState();
  }

  @HostListener('window:keydown', ['$event'])
  listenForEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.updateUserName();
    }
  }
}
